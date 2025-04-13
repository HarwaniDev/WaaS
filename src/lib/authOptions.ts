import { Keypair } from "@solana/web3.js";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      try {
        const isUserRegistered = await prisma?.user.findFirst({
          where: {
            email: user.email
          }
        })
        if (!isUserRegistered) {
          const keypair = Keypair.generate();
          const publicKey = keypair.publicKey.toBase58();
          const privateKey = keypair.secretKey.toString();

          await prisma?.user.create({
            data: {
              email: user.email,
              name: user.name,
              profilePicture: user.image,
              solWallet: {
                create: {
                  publicKey: publicKey,
                  privateKey: privateKey
                }
              }
            }
          })
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
}