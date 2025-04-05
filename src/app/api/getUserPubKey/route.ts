import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function getUserPublicKey(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, {status: 401})
      }    

    try {
        const { name } = await req.json();
        const user = await prisma?.user.findFirst({
            where: {
                name: name
            }
        });
        if (!user) {
            return NextResponse.json({
                error: "No user with given name found"
            }, {
                status: 402
            })
        }
        const wallet = await prisma?.solWallet.findFirst({
            where: {
                userId: user?.id
            }
        });
        return NextResponse.json({
            publicKey: wallet?.publicKey
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: "Something wrong at our side"
        }, {
            status: 500
        })
    }

}

export { getUserPublicKey as POST };

