import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getAssetDetails } from "@/utils/helpers";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getDetails(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };

    try {
        const { publicKey, uniqueMints } = await req.json();

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

        const response: { [key: string]: any } = {};
        for (const mint of uniqueMints) {
            const details = await getAssetDetails(mint, 0);
            response[mint] = details;
        }

        return NextResponse.json(response, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({
            error
        }, { status: 501 })
    }
}

export { getDetails as POST }