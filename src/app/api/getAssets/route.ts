import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";

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

        
        if(requestingUser !== targetUser) {
            return NextResponse.json({
                error: "You dont have the authority to get another person's key details"
            }, {status: 301})
        };

        const response = await axios.post(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
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

          console.log(response);
          

    } catch (error) {
        console.error("Error in getting user's assets:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    };
};

export { getAssets as POST };