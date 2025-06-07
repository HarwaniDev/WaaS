import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionMessage } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { prisma } from "@/lib/prisma";

async function getFees(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    try {
        const { publicKey, sol, recipient, mint, amount } = await req.json();
        const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

        // Input validation
        if (!publicKey || typeof publicKey !== 'string' || publicKey.length > 44) {
            return NextResponse.json({
                error: "Invalid input"
            }, { status: 400 });
        };

        const requestingUser = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        });

        if (!requestingUser) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        };

        const targetUser = await prisma.user.findFirst({
            where: {
                solWallet: {
                    publicKey: publicKey
                }
            }
        });


        if (!targetUser) {
            return NextResponse.json({
                error: "Wallet not found"
            }, { status: 404 });
        }


        if (requestingUser.id !== targetUser.id) {
            return NextResponse.json({
                error: "You dont have the authority to request transaction on behalf of another person"
            }, { status: 301 })
        };

        const sender = new PublicKey(publicKey);
        const reciever = new PublicKey(recipient);
        const blockhash = (await connection.getLatestBlockhash()).blockhash;


        if (sol) {

            const instruction = SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: reciever,
                lamports: sol * LAMPORTS_PER_SOL
            });

            const messageV0 = new TransactionMessage({
                payerKey: sender,
                recentBlockhash: blockhash,
                instructions: [instruction]
            }).compileToV0Message();

            const fee = await connection.getFeeForMessage(messageV0);

            return NextResponse.json({
                fee: fee.value
            }, { status: 200 });
        }

        if (mint && amount) {

            const mintAddress = new PublicKey(mint);
            const senderATA = await getAssociatedTokenAddress(mintAddress, sender);
            const recieverATA = await getAssociatedTokenAddress(mintAddress, reciever);

            const instructions = [];

            const recieverInfo = await connection.getAccountInfo(recieverATA);

            // if doesn't exist then add the instruction
            if (!recieverInfo) {
                instructions.push(
                    createAssociatedTokenAccountInstruction(
                        sender, recieverATA, reciever, mintAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID
                    )
                );
            }

            instructions.push(
                createTransferInstruction(
                    senderATA, recieverATA, sender, amount, [], TOKEN_PROGRAM_ID
                )
            );

            const messageV0 = new TransactionMessage({
                payerKey: sender,
                recentBlockhash: blockhash,
                instructions
            }).compileToV0Message();

            const fee = await connection.getFeeForMessage(messageV0);

            return NextResponse.json({
                fee: fee.value
            }, { status: 200 });
        }



    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    };
}

export { getFees as POST }