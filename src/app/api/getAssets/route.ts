import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssetDetails } from "@/utils/helpers";

async function getAssets(req: NextRequest) {
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

    const [balanceResponse, tokenAccountResponse] = await Promise.all([
      axios.post(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": [
          // add public key parameter here
          publicKey
        ]
      }),
      axios.post(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTokenAccountsByOwner",
        "params": [
          publicKey,
          {
            "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "encoding": "jsonParsed"
          }
        ]
      })

    ]);

    const lamports = balanceResponse.data.result.value;

    const promises = tokenAccountResponse.data.result.value.map((token: any) => {
      if (token.account.data.parsed.info.tokenAmount.uiAmount === 0) {
        return;
      }
      return getAssetDetails(token.account.data.parsed.info.mint, token.account.data.parsed.info.tokenAmount.uiAmount);
    });

    const result = await Promise.all(promises.filter((p: Promise<any>) => p !== undefined));
    return NextResponse.json({
      solBalance: lamports / LAMPORTS_PER_SOL,
      result
    }, { status: 200 });


  } catch (error) {
    console.error("Error in getting user's assets:", error);
    return NextResponse.json({
      error: "Internal server error"
    }, { status: 500 })
  };
};

export { getAssets as POST };