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
import DashboardTab from "./DashboardTab";
import SendTab from "./SendTab";
import ReceiveTab from "./ReceiveTab";
import SwapTab from "./SwapTab";
import BackgroundDecorations from "@/components/ui/BackgroundDecorations";

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
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'send' | 'receive' | 'swap'>('dashboard');

    const firstName = session.data?.user?.name || 'User';

    // Fetch asset details for all token transactions
    const fetchAssetDetails = async () => {
        const tokenTransactions = transactions.filter(tx => tx.type === "TOKEN" && tx.mint);
        const uniqueMints = [...new Set(tokenTransactions.map(tx => tx.mint))];

        const response = await axios.post("http://localhost:3000/api/getAssetDetails", {
            publicKey: walletAddress,
            uniqueMints: uniqueMints
        })        
        setAssetDetails(response.data);
    };

    useEffect(() => {
        if (session.status === "loading") {
            return;
        }

        let solPriceValue: number;

        (async function () {
            solPriceValue = await getSolanaPrice();
            setSolPrice(solPriceValue);
        })();

        async function getPublicKey(): Promise<string> {
            const response = await axios.post("http://localhost:3000/api/getUserPubKey", {
                email: session.data?.user?.email
            });

            setWalletAddress(response.data.publicKey);
            return response.data.publicKey;
        }

        async function getAssetsandTransactions() {
            try {
                const walletAddress = await getPublicKey();
                const [response1, response2] = await Promise.all([
                    axios.post("http://localhost:3000/api/getAssets", {
                        publicKey: walletAddress
                    }),
                    axios.post("http://localhost:3000/api/getTransactions", {
                        publicKey: walletAddress
                    })
                ]);

                // Wait for Solana price to be available
                while (!solPriceValue) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }

                setSolBalance(response1.data.solBalance);
                setTokens(response1.data.result);
                setTransactions(response2.data.transactions);
                
                // Calculate total balance after we have both Solana price and assets
                const solValue = response1.data.solBalance * solPriceValue;
                const tokenValues = response1.data.result
                    .filter((token: Token) => token.pricePerToken)
                    .reduce((sum: number, token: Token) => sum + (token.amount * token.pricePerToken), 0);
                const totalBalance = (solValue + tokenValues).toFixed(2);
                setBalance(totalBalance);

                if (transactions.length > 0) {
                    await fetchAssetDetails();
                }
            } finally {
                setIsLoading(false);
            }
        };

        getAssetsandTransactions();
    }, [session]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-600">Preparing your account...</p>
                </div>
            </div>
        );
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
        // add a toast notification here
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <BackgroundDecorations />
            <div className="flex-1 overflow-auto max-w-3/4 w-full px-4">
                
                <main className="container py-8">
                    {activeTab === 'dashboard' && <DashboardTab walletAddress={walletAddress} balance={balance} tokens={tokens || []} solBalance={solBalance} solPrice={solPrice} transactions={transactions} assetDetails={assetDetails} copyToClipboard={copyToClipboard} user={session.data?.user ? { image: session.data.user.image ?? undefined } : undefined} activeTab={activeTab} setActiveTab={setActiveTab} firstName={firstName} />}
                    {activeTab !== 'dashboard' && (
                        <div className="mb-6 flex items-center">
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-white font-medium shadow hover:bg-cyan-600 transition-colors"
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                    {activeTab === 'send' && <SendTab />}
                    {activeTab === 'receive' && <ReceiveTab walletAddress={walletAddress} copyToClipboard={copyToClipboard} />}
                    {activeTab === 'swap' && <SwapTab />}
                    
                </main>
            </div>
        </div>
    )
}


