import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function addTransaction(req: NextRequest) {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (token !== process.env.WEBHOOK_AUTH_HEADER) {
        return NextResponse.json({
            message: "unauthorized"
        }, { status: 401 })
    };

    const sender = body.nativeTransfers.fromUserAccount;
    const reciever = body.nativeTransfers.toUserAccount;
    const amount = body.nativeTransfers.amount;
    const signature = body.signature;
    const timestamp = body.timestamp;
    const fees = body.fee;

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
                sender, reciever, amount, fees, timestamp, signature,
                solWallet: {
                    connect: { publicKey: wallet?.publicKey }
                }
            }
        });
    }

    return NextResponse.json({
        message: "transaction added successfully"
    }, {
        status: 200
    })
}

export { addTransaction as POST };