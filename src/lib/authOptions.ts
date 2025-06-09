import { Keypair } from "@solana/web3.js";
import { AuthOptions } from "next-auth";
import { split } from 'shamir-secret-sharing';
import Google from "next-auth/providers/google";
import { prisma, prisma2, prisma3 } from "./prisma";
import axios from "axios";

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
          // create a new address for the newly registered user
          const keypair = Keypair.generate();
          const publicKey = keypair.publicKey.toBase58();
          const [share1, share2, share3] = await split(keypair.secretKey, 3, 2);
          const newUser = await prisma?.user.create({
            data: {
              email: user.email,
              name: user.name,
              profilePicture: user.image,
              solWallet: {
                create: {
                  publicKey: publicKey,
                  KeyShare: {
                    create: {
                      index: 1,
                      share: share1
                    }
                  }
                }
              }
            }
          });

          const solWallet = await prisma.solWallet.findFirst({
            where: {
              userId: newUser.id
            }
          })

          // create keyshare2 and keyshare3
          await Promise.all([
            prisma2.keyShare2.create({
              data: {
                index: 2,
                share: share2,
                solWalletId: solWallet!.id
              }
            }),
            prisma3.keyShare3.create({
              data: {
                index: 3,
                share: share3,
                solWalletId: solWallet!.id
              }
            })
          ])




          // get all the addresses
          const allWallets = await prisma.solWallet.findMany();
          const publicKeys = [];
          for (const wallet of allWallets) {
            publicKeys.push(wallet.publicKey);
          }
          publicKeys.push(publicKey);
          const response = await axios.put(`https://api.helius.xyz/v0/webhooks/${process.env.WEBHOOK_ID}?api-key=${process.env.HELIUS_API_KEY}`, {
            "webhookID": process.env.WEBHOOK_ID,
            "project": "e398da09-dc8c-40b3-80c6-58321357ded8",
            "wallet": "devharwani.work@gmail.com",
            "webhookURL": "https://httpdump.app/dumps/336a1141-d656-4f29-b898-0b5f06e71169",
            "accountAddresses": publicKeys,
            "transactionTypes": [
              "TRANSFER"
            ],
            "webhookType": "enhanced",
            "encoding": "jsonParsed"
          });
          console.log(response.data);
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