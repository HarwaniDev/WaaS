"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet, Zap, Globe } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Home() {
  const session = useSession();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="m-8 flex items-center gap-2">
              <Wallet className="h-6 w-6 text-cyan-500" />
              <span className="text-xl font-bold text-cyan-500">WaaS</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {!session.data?.user ?
               <Button variant="outline" className="hidden sm:flex m-8 hover:bg-cyan-500 hover:text-white" onClick={() => {
                signIn("google", {callbackUrl: "http://localhost:3000/dashboard"})
               }}>
                Login
              </Button> :
              <Button variant="outline" className="hidden sm:flex m-8 hover:bg-cyan-500 hover:text-white" onClick={() => {
                signOut({callbackUrl: "http://localhost:3000"})
               }}>
                Log Out
              </Button> 
              }
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container px-4 md:px-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Your Solana <span className="text-muted-foreground">wallet,</span>{" "}
              <span className="text-cyan-500">simplified</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
              Create and manage your Solana wallet with just a Google Account
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Secure, custodial wallet for Solana tokens
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" onClick={() => {
              if (session.data?.user) {
                window.location.href = "/dashboard";
              } else {
                signIn("google", {callbackUrl: "http://localhost:3000/dashboard"});
              }
            }}>
              <Image src="/google.svg?height=20&width=20" width={20} height={20} alt="Google" className="mr-2" />
              Get started
            </Button>
          </motion.div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <motion.div 
              ref={ref1}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid gap-8 md:grid-cols-3"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Wallet className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Storage</h3>
                <p className="text-sm text-muted-foreground">Advanced key sharing mechanism for maximum security.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Token Swaps</h3>
                <p className="text-sm text-muted-foreground">Seamlessly swap between Solana tokens with the best rates.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Asset Management</h3>
                <p className="text-sm text-muted-foreground">Track your SOL and SPL tokens in one place.</p>
              </div>
            </motion.div>

            <motion.div 
              ref={ref2}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 bg-white p-8 rounded-lg shadow-sm"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <Image
                    src="/image.png"
                    width={600}
                    height={500}
                    alt="waas wallet interface"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold">Your Solana Wallet, Simplified</h2>
                  <p className="text-muted-foreground">
                    WaaS makes managing your Solana assets effortless. Send, receive, and swap tokens with ease.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                        <ArrowRight className="h-3 w-3 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">One-Click Setup</h4>
                        <p className="text-sm text-muted-foreground">
                          Create your Solana wallet instantly with Google authentication
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                        <ArrowRight className="h-3 w-3 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure by Design</h4>
                        <p className="text-sm text-muted-foreground">
                          Advanced key sharing mechanism protects your assets
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                        <ArrowRight className="h-3 w-3 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Token Swaps</h4>
                        <p className="text-sm text-muted-foreground">
                          Swap between Solana tokens with competitive rates
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <motion.div 
            ref={ref3}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="container px-4 md:px-6 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to manage your Solana assets?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join users who are already managing their Solana tokens with WaaS.
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600" onClick={() => {
              if (session.data?.user) {
                window.location.href = "/dashboard";
              } else {
                signIn("google", {callbackUrl: "http://localhost:3000/dashboard"});
              }
            }}>
              Create Your Wallet
            </Button>
          </motion.div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-cyan-500" />
              <span className="text-sm font-medium">WaaS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

