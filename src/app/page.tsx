"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet, Zap, Globe } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {

  const session = useSession();

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
          <div className="container px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              The wallet <span className="text-muted-foreground">of tomorrow,</span>{" "}
              <span className="text-cyan-500">today</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
              Create a wallet with just a Google Account
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Custodial cloud wallet for you
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
              <Image src="/google.svg?height=20&width=20" width={20} height={20} alt="Google" className="mr-2" />
              Get started
            </Button>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Wallet className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">WaaS Wallet Adapter</h3>
                <p className="text-sm text-muted-foreground">Make blockchain apps consumer-ready.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">WaaS Pro</h3>
                <p className="text-sm text-muted-foreground">Send digital assets at scale, even to non-crypto users.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-10 w-10 bg-cyan-100 rounded-md flex items-center justify-center mb-4">
                  <Globe className="h-5 w-5 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">WaaS Wallet</h3>
                <p className="text-sm text-muted-foreground">The world's simplest wallet.</p>
              </div>
            </div>

            <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    width={600}
                    height={500}
                    alt="waas wallet interface"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold">Simplify your digital asset experience</h2>
                  <p className="text-muted-foreground">
                    waas makes managing digital assets easy for everyone. No complicated setup, no technical knowledge
                    required.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                        <ArrowRight className="h-3 w-3 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Instant Setup</h4>
                        <p className="text-sm text-muted-foreground">
                          Create a wallet in seconds with your existing accounts
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
                          Enterprise-grade security without the complexity
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                        <ArrowRight className="h-3 w-3 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Send to Anyone</h4>
                        <p className="text-sm text-muted-foreground">
                          Share assets with anyone, even if they're new to crypto
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your wallet experience?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have simplified their digital asset management with waas.
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
              Create Your Wallet
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-cyan-500" />
              <span className="text-sm font-medium">waas</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} waas. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

