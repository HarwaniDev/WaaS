"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Copy, Download, Plus, Send, Upload, User } from "lucide-react"
import { useSession } from "next-auth/react"
import axios from "axios";
import { Token, Transaction } from "@/lib/interfaces"
import { getQuote, getSolanaPrice, getAssetDetails } from "@/utils/helpers"
export default function Dashboard() {
    const session = useSession();
    // implement below if condition so that only logged in user can visit the page.

    // if(session.data?.user) {
    //     return <></>
    // }

    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [tokens, setTokens] = useState<Token[]>();
    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assetDetails, setAssetDetails] = useState<{ [key: string]: any }>({});

    const getDetails = async (mintAddress: string) => {
        if (assetDetails[mintAddress]) return assetDetails[mintAddress];

        try {
            const response = await getAssetDetails(mintAddress);
            setAssetDetails(prev => ({
                ...prev,
                [mintAddress]: response
            }));
            return response;
        } catch (error) {
            console.error("Error fetching asset details:", error);
            return null;
        }
    };

    // Fetch asset details for all token transactions
    const fetchAssetDetails = async () => {
        const tokenTransactions = transactions.filter(tx => tx.type === "TOKEN" && tx.mint);
        const uniqueMints = [...new Set(tokenTransactions.map(tx => tx.mint))];

        for (const mint of uniqueMints) {
            if (mint && !assetDetails[mint]) {
                await getDetails(mint);
            }
        }
    };

    useEffect(() => {
        if (session.status === "loading") {
            return;
        }

        (async function () {
            const price: number = await getSolanaPrice();
            setSolPrice(price);
        })();

        async function getPublicKey(): Promise<string> {

            const response = await axios.post("http://localhost:3000/api/getUserPubKey", {
                email: session.data?.user?.email
            });

            setWalletAddress(response.data.publicKey);
            return response.data.publicKey;
        }

        async function getAssetsandTransactions() {
            const walletAddress = await getPublicKey();
            const [response1, response2] = await Promise.all([
                axios.post("http://localhost:3000/api/getAssets", {
                    publicKey: walletAddress
                }),
                axios.post("http://localhost:3000/api/getTransactions", {
                    publicKey: walletAddress
                })
            ])
            setSolBalance(response1.data.solBalance);
            setTokens(response1.data.result);
            setTransactions(response2.data.transactions);
            if (transactions.length > 0) {
                fetchAssetDetails();
            }
            // setBalance(response.data)
        };

        const timeout = setTimeout(() => {
            getAssetsandTransactions();
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [session]);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
        // add a toast notification here
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
                                            <p className="text-sm">{walletAddress.slice(0, 3)}...{walletAddress.slice(-3)}</p>
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
                                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                                        <img src="solana.png" alt="" className="rounded-full" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">Solana</p>
                                                        <p className="text-sm text-muted-foreground">Sol</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">{Number(solBalance).toFixed(2)}</p>
                                                    <p className="text-sm text-muted-foreground">${(solBalance * solPrice).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            {tokens?.map((token, key) => {
                                                if (!token.name) {
                                                    return;
                                                }
                                                return (
                                                    <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                                                <img src={token.imageLink} alt="" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{token.name}</p>
                                                                <p className="text-sm text-muted-foreground">{token.symbol}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium">{Number(token.amount).toFixed(2)}</p>
                                                            <p className="text-sm text-muted-foreground">{token.pricePerToken ? <>${(token.amount * token.pricePerToken).toFixed(2)}</> : <>-</>}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="activity" className="p-6 space-y-6 m-0">
                                        <div className="grid gap-4">

                                            {transactions.map((tx, index) => {
                                                const isSender = tx.sender === walletAddress;
                                                const amount = tx.type === "NATIVE"
                                                    ? Number(tx.amount) / Math.pow(10, 9) // SOL has 9 decimals
                                                    : Number(tx.tokenAmount);
                                                const formattedAmount = amount;

                                                // Find token details if it's a token transfer
                                                const tokenDetails = tx.type === "TOKEN" && tx.mint
                                                    ? tokens?.find(t => t.mintAddress === tx.mint)
                                                    : null;

                                                const symbol = tx.type === "TOKEN"
                                                    ? tokenDetails?.symbol || "Unknown Token"
                                                    : "SOL";

                                                const date = new Date(Number(tx.timestamp) * 1000);
                                                const formattedDate = date.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true
                                                });

                                                return (
                                                    <div key={tx.signature} className="flex items-center justify-between p-4 border-b">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                {isSender ? <Upload className="h-4 w-4 text-green-500" /> : <Download className="h-4 w-4 text-green-500" />}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    {isSender ? `Sent ${symbol}` : `Received ${symbol}`}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {isSender ? 'To: ' : 'From: '}
                                                                    {isSender ? tx.reciever : tx.sender}
                                                                </p>
                                                                {tx.type === "TOKEN" && tx.mint && (
                                                                    <>
                                                                        <p className="text-xs text-muted-foreground">
                                                                            Mint: {tx.mint.slice(0, 4)}...{tx.mint.slice(-4)}
                                                                        </p>
                                                                        {assetDetails[tx.mint] && (
                                                                            <p className="text-xs text-muted-foreground">
                                                                                Name: {assetDetails[tx.mint].name}
                                                                            </p>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`font-medium ${isSender ? 'text-red-500' : 'text-green-500'}`}>
                                                                {isSender ? '-' : '+'}{formattedAmount} {symbol}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                ${(amount * (tx.type === "TOKEN" ? (tokenDetails?.pricePerToken || 0) : solPrice)).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
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


