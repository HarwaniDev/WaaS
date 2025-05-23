import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


async function getTransactions(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  };

  try {
    const { publicKey } = await req.json();

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

    const sentTransactions = await prisma.transaction.findMany({
      where: { sender: publicKey }
    });
    const recievedTransactions = await prisma.transaction.findMany({
      where: { reciever: publicKey }
    });
    const allTransactions = sentTransactions.concat(recievedTransactions);
    const sanitizedTransactions = allTransactions.map(tx => ({
      ...tx,
      timestamp: tx.timestamp.toString(),
      ...(tx.amount && { amount: tx.amount.toString() }),
      ...(tx.tokenAmount && { tokenAmount: tx.tokenAmount.toString() }),
      fees: tx.fees.toString(),
    }));

    return NextResponse.json({
      transactions: sanitizedTransactions
    }, { status: 200 })
  }
  catch (e) {
    return NextResponse.json({
      message: "error getting transactions: " + e
    }, { status: 500 })
  }
}


export { getTransactions as POST };