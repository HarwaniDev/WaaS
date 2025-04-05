"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Copy, Download, Plus, Send, Upload, User } from "lucide-react"
import { useSession } from "next-auth/react"
import axios from "axios";
export default function Dashboard() {
    const session = useSession();
    // implement below if condition so that only logged in user can visit the page.

    // if(session.data?.user) {
    //     return <></>
    // }

    useEffect(() => {
        async function getPublicKey() {
            const response = await axios.post("http://localhost:3000/api/getUserPubKey", {
                name: session.data?.user?.name
            });
            console.log(response);
        }
        const timeout = setTimeout(() => {
            getPublicKey();
        }, 5000);
        // clearTimeout(timeout);
        
    }, [session])

    const [walletAddress, setWalletAddress] = useState("0x1234...5678")
    const [balance, setBalance] = useState("1,234.56")

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
        // You could add a toast notification here
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <div className="flex-1 overflow-auto max-w-3/4 w-full px-4">
                <header className="bg-white border-b sticky top-0 z-10">
                    <div className="container flex h-16 items-center justify-between">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {session.data?.user?.image ?
                                    <img src={session.data.user.image} alt="" className="rounded-full h-8 w-8 flex items-center justify-center" /> :
                                    <div className="rounded-full h-8 w-8 flex items-center justify-center">
                                        <User className="h-4 w-4 text-cyan-500" />
                                    </div>
                                }
                                <span className="text-sm font-medium">{session.data?.user?.name}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container py-8">
                    <div className="grid gap-8">
                        {/* Wallet Card */}
                        <Card className="overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 p-6 text-white">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-sm font-medium opacity-80">Your Wallet</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-sm">{walletAddress}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30"
                                                onClick={copyToClipboard}
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-white/20 hover:bg-white/30 text-white border-0"
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Receive
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-white text-cyan-500 hover:bg-white/90 border-0"
                                        >
                                            <Send className="h-4 w-4 mr-1" />
                                            Send
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium opacity-80">Total Balance</h3>
                                    <p className="text-3xl font-bold">${balance} USD</p>
                                </div>
                            </div>
                            <CardContent className="p-0">
                                <Tabs defaultValue="assets" className="w-full">
                                    <div className="border-b px-6">
                                        <TabsList className="bg-transparent border-b-0 -mb-px">
                                            <TabsTrigger
                                                value="assets"
                                                className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none"
                                            >
                                                Assets
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="activity"
                                                className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none"
                                            >
                                                Activity
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="assets" className="p-6 space-y-6 m-0">
                                        <div className="grid gap-4">
                                            {/* Asset Item */}
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                                        <span className="font-bold text-cyan-500">$</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">USD Coin</p>
                                                        <p className="text-sm text-muted-foreground">USDC</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">1,000.00</p>
                                                    <p className="text-sm text-muted-foreground">$1,000.00</p>
                                                </div>
                                            </div>

                                            {/* Asset Item */}
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                                        <span className="font-bold text-amber-500">B</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Bitcoin</p>
                                                        <p className="text-sm text-muted-foreground">BTC</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">0.0085</p>
                                                    <p className="text-sm text-muted-foreground">$234.56</p>
                                                </div>
                                            </div>

                                            {/* Add Asset Button */}
                                            <Button variant="outline" className="flex items-center gap-2 w-full">
                                                <Plus className="h-4 w-4" />
                                                Add Asset
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="activity" className="p-6 space-y-6 m-0">
                                        <div className="grid gap-4">
                                            {/* Transaction Item */}
                                            <div className="flex items-center justify-between p-4 border-b">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Download className="h-4 w-4 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Received USDC</p>
                                                        <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-green-500">+100.00 USDC</p>
                                                    <p className="text-sm text-muted-foreground">$100.00</p>
                                                </div>
                                            </div>

                                            {/* Transaction Item */}
                                            <div className="flex items-center justify-between p-4 border-b">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <Upload className="h-4 w-4 text-red-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Sent BTC</p>
                                                        <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-red-500">-0.0015 BTC</p>
                                                    <p className="text-sm text-muted-foreground">$41.25</p>
                                                </div>
                                            </div>

                                            {/* Transaction Item */}
                                            <div className="flex items-center justify-between p-4 border-b">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Download className="h-4 w-4 text-green-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Received BTC</p>
                                                        <p className="text-sm text-muted-foreground">Apr 12, 9:20 AM</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-green-500">+0.01 BTC</p>
                                                    <p className="text-sm text-muted-foreground">$275.80</p>
                                                </div>
                                            </div>

                                            <Button variant="outline" className="flex items-center gap-2 w-full">
                                                <ArrowRight className="h-4 w-4" />
                                                View All Transactions
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Send</CardTitle>
                                    <CardDescription>Send assets to any wallet address</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Recipient Address</label>
                                            <Input placeholder="Enter wallet address" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Amount</label>
                                            <div className="flex gap-2">
                                                <Input placeholder="0.00" />
                                                <select className="h-10 rounded-md border border-input bg-background px-3 py-2">
                                                    <option>USDC</option>
                                                    <option>BTC</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-cyan-500 hover:bg-cyan-600">Send Assets</Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Receive</CardTitle>
                                    <CardDescription>Share your address to receive assets</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center">
                                    <div className="h-32 w-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground">QR Code</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-muted-foreground truncate max-w-[150px]">{walletAddress}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={copyToClipboard}>
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">
                                        Download QR Code
                                    </Button>
                                </CardFooter>
                            </Card>


                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


