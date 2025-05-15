import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

async function addTransaction(req: NextRequest) {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");
    
    if(authHeader !== process.env.WEBHOOK_AUTH_HEADER) {
        return NextResponse.json({
            message: "unauthorized"
        }, {status: 401})
    }

    const sender: string = body.nativeTransfers.fromUserAccount;
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


    await prisma.transaction.create({
        data: {
            sender: sender,
            reciever: reciever,
            amount: amount,
            fees: fees,
            timestamp: timestamp,
            signature: signature,
            solWallet: {
                connect: {
                    publicKey: checkSender ? checkSender.publicKey : checkReciever?.publicKey
                }
            }
        }
    })

    return NextResponse.json({
        message: "transaction added succcessfully"
    }, {
        status: 200
    })
}

export {addTransaction as POST};