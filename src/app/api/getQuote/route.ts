import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

async function getQuote(req: NextRequest) {

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    try {
        const { publicKey, inputMint, outputMint, amount } = await req.json();
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
                error: "You dont have the authority to request transaction on behalf of another person"
            }, { status: 301 })
        };
        const response = await axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}`)

        return NextResponse.json({
            response: response.data
        }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }

}

export { getQuote as POST }