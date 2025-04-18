import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import bs58 from "bs58";
import { TokenInterface } from "@/lib/interfaces";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
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

    const tokenAccountResponse = await axios.post(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
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
    });

    const balanceResponse = await axios.post(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getBalance",
      "params": [
        publicKey
      ]
    });

    const lamports = balanceResponse.data.result.value;
    const fungibleTokens: TokenInterface[] = [];
    const nonFungibleTokens: TokenInterface[] = [];

    tokenAccountResponse.data.result.value.map((token: any) => {
      if (token.account.data.parsed.info.tokenAmount.amount === "1" && token.account.data.parsed.info.tokenAmount.decimals === 0) {
        nonFungibleTokens.push({ mintAddress: token.account.data.parsed.info.mint, amount: token.account.data.parsed.info.tokenAmount.uiAmount });
      } else {
        fungibleTokens.push({ mintAddress: token.account.data.parsed.info.mint, amount: token.account.data.parsed.info.tokenAmount.uiAmount });
      }
    })

    return NextResponse.json({
      solBalance: lamports / LAMPORTS_PER_SOL,
      fungibleTokens: fungibleTokens,
      nonFungibleTokens: nonFungibleTokens
    }, { status: 200 });


  } catch (error) {
    console.error("Error in getting user's assets:", error);
    return NextResponse.json({
      error: "Internal server error"
    }, { status: 500 })
  };
};

export { getAssets as POST };