import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function addTransaction(req: NextRequest) {
    try {
        const body = await req.json();        
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];
        if (token !== process.env.WEBHOOK_AUTH_HEADER) {
            return NextResponse.json({
                message: "unauthorized"
            }, { status: 401 })
        };

        // Handle array of transactions
        const transactions = Array.isArray(body) ? body : [body];
        for (const transaction of transactions) {
            const signature = transaction.signature;
            const timestamp = transaction.timestamp;
            const fees = transaction.fee;

            // Validate transaction structure
            if (!transaction || typeof transaction !== 'object') {
                console.error('Invalid transaction:', transaction);
                continue;
            }

            // for transactions involving sol transfers
            if (Array.isArray(transaction.nativeTransfers) && transaction.nativeTransfers.length > 0) {
                const nativeTransfers = transaction.nativeTransfers[0];
                if (!nativeTransfers) {
                    console.error('Invalid nativeTransfers data');
                    continue;
                }
                const sender = nativeTransfers.fromUserAccount;
                const reciever = nativeTransfers.toUserAccount;
                const amount = nativeTransfers.amount;

                if (!sender || !reciever || !amount) {
                    console.error('Missing required fields in nativeTransfers:', { sender, reciever, amount });
                    continue;
                }

                const checkSender = await prisma.solWallet.findUnique({
                    where: {
                        publicKey: sender
                    }
                });
                const checkReciever = await prisma.solWallet.findUnique({
                    where: {
                        publicKey: reciever
                    }
                });

                const involvedWallets = [checkSender, checkReciever].filter(Boolean);

                for (const wallet of involvedWallets) {
                    if (!wallet) continue;
                    try {
                        await prisma.transaction.create({
                            data: {
                                signature: signature,
                                sender: sender,
                                reciever: reciever,
                                amount: amount,
                                timestamp: timestamp,
                                fees: fees,
                                type: "NATIVE",
                                solWallet: {
                                    connect: { publicKey: wallet.publicKey }
                                }
                            }
                        });
                    } catch (error) {
                        console.error('Error creating transaction:', error);
                    }
                }
            }

            // for transactions involving token transfers
            if (Array.isArray(transaction.tokenTransfers) && transaction.tokenTransfers.length > 0) {
                const tokenTransfers = transaction.tokenTransfers[0];
                if (!tokenTransfers) {
                    console.error('Invalid tokenTransfers data');
                    continue;
                }
                const sender = tokenTransfers.fromUserAccount;
                const reciever = tokenTransfers.toUserAccount;
                const mintAddress = tokenTransfers.mint;
                const tokenAmount = tokenTransfers.tokenAmount;

                if (!sender || !reciever || !mintAddress || !tokenAmount) {
                    console.error('Missing required fields in tokenTransfers:', { sender, reciever, mintAddress, tokenAmount });
                    continue;
                }


                const checkSender = await prisma.solWallet.findUnique({
                    where: {
                        publicKey: sender
                    }
                });
                const checkReciever = await prisma.solWallet.findUnique({
                    where: {
                        publicKey: reciever
                    }
                });

                const involvedWallets = [checkSender, checkReciever].filter(Boolean);
                for (const wallet of involvedWallets) {
                    if (!wallet) continue;
                    try {
                        await prisma.transaction.create({
                            data: {
                                signature: signature,
                                sender: sender,
                                reciever: reciever,
                                tokenAmount: tokenAmount,
                                timestamp: timestamp,
                                fees: fees,
                                type: "TOKEN",
                                mint: mintAddress,
                                solWallet: {
                                    connect: { publicKey: wallet.publicKey }
                                }
                            }
                        });
                    } catch (error) {
                        console.error('Error creating token transaction:', error);
                    }
                }
            }
        }

        return NextResponse.json({
            message: "transaction(s) processed successfully"
        }, {
            status: 200
        })
    } catch (error) {
        console.error('Error processing transaction:', error);
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}

export { addTransaction as POST };