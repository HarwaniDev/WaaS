import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import { clusterApiUrl, Connection, Keypair, VersionedTransaction } from "@solana/web3.js";

async function sendSwapTransaction(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    try {
        const { publicKey, quote } = await req.json();
        const latestBlockhash = await connection.getLatestBlockhash();
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
                error: "You dont have the authority to get another person's key details"
            }, { status: 301 })
        };

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

        const response = await axios.post("https://quote-api.jup.ag/v6/swap", {
            quote,
            userPublicKey: publicKey,
            wrapAndUnwrapSol: true,
            feeAccount: null
        });
        const swapTransactionBuf = Buffer.from(response.data, 'base64');
        const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
        transaction.sign([userKeyPair]);

        const rawTransaction = transaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
            skipPreflight: true,
            maxRetries: 2
        });
        return NextResponse.json({
            txid: txid
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 501 })
    }
};

export { sendSwapTransaction as POST };