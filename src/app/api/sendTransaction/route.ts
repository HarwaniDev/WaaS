import { authOptions } from "@/lib/authOptions";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import prisma from "@/lib/prisma";

async function sendTransaction(req: NextRequest) {

    const session = await getServerSession(authOptions);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

    if (!session?.user?.email) {    
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    try {

        const { publicKey, sol, recipient, mint, amount } = await req.json();
        const sender = new PublicKey(publicKey);
        const reciever = new PublicKey(recipient);
        const user = await prisma?.solWallet.findFirst({
            where: {
                publicKey: publicKey
            }
        });
        if (!user) {
            return NextResponse.json({
                message: "user not found"
            }, { status: 404 });
        }
        const userSecretKey = Buffer.from(user.privateKey, "base64");
        const userKeyPair = Keypair.fromSecretKey(userSecretKey);

        if (sol) {
            // create instruction
            const instruction = SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: reciever,
                lamports: sol * LAMPORTS_PER_SOL
            });

            // create new TransactionMessage
            const messageV0 = new TransactionMessage({
                payerKey: sender,
                recentBlockhash: latestBlockhash,
                instructions: [instruction]
            }).compileToV0Message();

            const tx = new VersionedTransaction(messageV0);

            //sign the transaction
            tx.sign([userKeyPair]);

            const txid = await connection.sendTransaction(tx, {
                skipPreflight: false
            });

            return NextResponse.json({
                txid: txid
            }, { status: 200 });
        }

        if (mint && amount) {
            const mintAddress = new PublicKey(mint);
            const senderATA = await getAssociatedTokenAddress(mintAddress, sender);
            const recieverATA = await getAssociatedTokenAddress(mintAddress, reciever);

            const instructions = [];

            const recieverInfo = await connection.getAccountInfo(recieverATA);
            if (!recieverInfo) {
                const ataInstruction = createAssociatedTokenAccountInstruction(sender,
                    recieverATA,
                    reciever,
                    mintAddress,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                );
                instructions.push(ataInstruction);
            }

            const transferInstruction = createTransferInstruction(
                senderATA,
                recieverATA,
                sender,
                amount,
                [],
                TOKEN_PROGRAM_ID
            );
            instructions.push(transferInstruction);

            const messageV0 = new TransactionMessage({
                payerKey: sender,
                recentBlockhash: latestBlockhash,
                instructions: instructions
            }).compileToV0Message();

            const tx = new VersionedTransaction(messageV0);
            tx.sign([userKeyPair]);

            const txid = await connection.sendTransaction(tx, {
                skipPreflight: false
            });

            return NextResponse.json({
                txid: txid
            }, { status: 200 });

        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}

export { sendTransaction as POST };