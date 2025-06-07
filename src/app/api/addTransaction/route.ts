import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function addTransaction(req: NextRequest) {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (token !== process.env.WEBHOOK_AUTH_HEADER) {
        return NextResponse.json({
            message: "unauthorized"
        }, { status: 401 })
    };

    const signature = body.signature;
    const timestamp = body.timestamp;
    const fees = body.fee;


    // for transactions involving sol transfers
    if (body.nativeTransfers.length !== 0) {
        const nativeTransfers = body.nativeTransfers[0];
        const sender = nativeTransfers.fromUserAccount;
        const reciever = nativeTransfers.toUserAccount;
        const amount = nativeTransfers.amount;


        const checkSender = await prisma.solWallet.findFirst({
            where: {
                publicKey: sender
            }
        });
        const checkReciever = await prisma.solWallet.findFirst({
            where: {
                publicKey: reciever
            }
        })

        const involvedWallets = [checkSender, checkReciever].filter(Boolean);
        for (const wallet of involvedWallets) {
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
                        connect: { publicKey: wallet?.publicKey }
                    }
                }
            });
        };
    }

    // for transactions involving token transfers
    if (body.tokenTransfers.length !== 0) {
        const tokenTransfers = body.tokenTransfers[0];
        const sender = tokenTransfers.fromUserAccount;
        const reciever = tokenTransfers.toUserAccount;
        const mintAddress = tokenTransfers.mint;
        const tokenAmount = tokenTransfers.tokenAmount;


        const checkSender = await prisma.solWallet.findFirst({
            where: {
                publicKey: sender
            }
        });
        const checkReciever = await prisma.solWallet.findFirst({
            where: {
                publicKey: reciever
            }
        })

        const involvedWallets = [checkSender, checkReciever].filter(Boolean);
        for (const wallet of involvedWallets) {
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
                        connect: { publicKey: wallet?.publicKey }
                    }
                }
            });
        };
    }


    return NextResponse.json({
        message: "transaction added successfully"
    }, {
        status: 200
    })
}

export { addTransaction as POST };