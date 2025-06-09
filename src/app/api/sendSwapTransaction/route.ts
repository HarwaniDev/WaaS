import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma, prisma2, prisma3 } from "@/lib/prisma";
import axios from "axios";
import { clusterApiUrl, Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { combine } from "shamir-secret-sharing";

async function sendSwapTransaction(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { publicKey, quote } = await req.json();

        // Input validation
        if (!publicKey || typeof publicKey !== 'string' || publicKey.length > 44) {
            return NextResponse.json({
                error: "Invalid input: Invalid public key"
            }, { status: 400 });
        }

        if (!quote) {
            return NextResponse.json({
                error: "Invalid input: Quote is required"
            }, { status: 400 });
        }

        const requestingUser = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        });

        if (!requestingUser) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

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
                error: "You don't have the authority to perform this action"
            }, { status: 403 });
        }

        const user = await prisma?.solWallet.findFirst({
            where: {
                publicKey: publicKey
            }
        })
        if (!user) {
            return NextResponse.json({
                message: "user not found"
            }, { status: 404 });
        }
        const [share1, share2, share3] = await Promise.all([
            prisma.keyShare.findFirst({
                where: {
                    solWalletId: user.id
                }
            }),
            prisma2.keyShare2.findFirst({
                where: {
                    solWalletId: user.id
                }
            }),
            prisma3.keyShare3.findFirst({
                where: {
                    solWalletId: user.id
                }
            })
        ])
        const shares = [share1, share2, share3].filter((s) => s !== null && s !== undefined).map((s) => s!.share);
        const secretKey = await combine(shares);
        const userKeyPair = Keypair.fromSecretKey(secretKey);

        try {
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
            }, { status: 200 });
        } catch (swapError: any) {
            console.error('Swap error:', swapError);
            return NextResponse.json({
                error: swapError.response?.data?.error || swapError.message || "Failed to execute swap"
            }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Transaction error:', error);
        return NextResponse.json({
            error: error.message || "Internal server error"
        }, { status: 500 });
    }
}

export { sendSwapTransaction as POST };