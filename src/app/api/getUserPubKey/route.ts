import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

async function getUserPublicKey(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const { email } = await req.json();

        // Input validation
        if (!email || typeof email !== 'string' || email.length > 100) {
            return NextResponse.json({
                error: "Invalid input"
            }, { status: 400 });
        }

        const requestingUser = await prisma.user.findFirst({
            where: {
                email: session.user.email
            }
        });

        if (!requestingUser) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

        const targetUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        });


        if (!targetUser) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

        if (requestingUser.id !== targetUser.id) {
            return NextResponse.json({
                error: "You don't have the authority to get another person's key details"
            }, { status: 403 })
        };

        // Get the wallet
        const wallet = await prisma.solWallet.findFirst({
            where: {
                userId: targetUser.id
            }
        });

        if (!wallet) {
            return NextResponse.json({
                error: "Wallet not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            publicKey: wallet.publicKey
        }, { status: 200 })
    } catch (error) {
        console.error("Error in getUserPublicKey:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}

export { getUserPublicKey as POST };

