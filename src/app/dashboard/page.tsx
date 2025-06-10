"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import axios from "axios";
import { Token, Transaction } from "@/lib/interfaces"
import { getSolanaPrice } from "@/utils/helpers"
import DashboardTab from "./DashboardTab";
import SendTab from "./SendTab";
import ReceiveTab from "./ReceiveTab";
import SwapTab from "./SwapTab";
import BackgroundDecorations from "@/components/ui/BackgroundDecorations";
import Navigation from "@/components/ui/Navigation";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Create axios instance with base URL
const api = axios.create({
    baseURL: typeof window !== 'undefined' ? window.location.origin : '',
});

export default function Dashboard() {
    const router = useRouter();
    const session = useSession();

    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [tokens, setTokens] = useState<Token[]>([]);
    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assetDetails, setAssetDetails] = useState<{ [key: string]: { name: string; symbol: string; imageLink: string; decimals: number } }>({});
    const [activeTab, setActiveTab] = useState<'dashboard' | 'send' | 'receive' | 'swap'>('dashboard');

    const firstName = session.data?.user?.name || 'User';

    // Handle redirect for non-authenticated users
    useEffect(() => {
        if (!session.data?.user) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [session.data?.user, router]);

    // Handle data fetching for authenticated users
    useEffect(() => {
        if (!session.data?.user) return;

        let solPriceValue: number;

        (async function () {
            solPriceValue = await getSolanaPrice();
            setSolPrice(solPriceValue);
        })();

        async function getPublicKey(): Promise<string> {
            const response = await api.post("/api/getUserPubKey", {
                email: session.data?.user?.email
            });

            setWalletAddress(response.data.publicKey);
            return response.data.publicKey;
        }

        async function getAssetsandTransactions() {
            try {
                const walletAddress = await getPublicKey();
                const [response1, response2] = await Promise.all([
                    api.post("/api/getAssets", {
                        publicKey: walletAddress
                    }),
                    api.post("/api/getTransactions", {
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
                const totalBalance = (solValue + tokenValues).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                setBalance(totalBalance);

                if (response2.data.transactions.length > 0) {
                    const tokenTransactions = response2.data.transactions.filter((tx: Transaction) => tx.type === "TOKEN" && tx.mint);
                    const uniqueMints = [...new Set(tokenTransactions.map((tx: Transaction) => tx.mint))];

                    const response = await api.post("/api/getAssetDetails", {
                        publicKey: walletAddress,
                        uniqueMints: uniqueMints
                    });
                    setAssetDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getAssetsandTransactions();
    }, [session.data?.user]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress);
        toast.success('Address copied to clipboard!', {
            style: {
                background: '#0EA5E9',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 16px',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#0EA5E9',
            },
        });
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: 'https://waas.0xdevs.xyz' });
    };

    if (session.status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-600">Preparing your account...</p>
                </div>
            </div>
        );
    }

    if (!session.data?.user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-600">Please log in to access the dashboard</p>
                    <p className="text-sm text-gray-500 mt-2">Redirecting to home page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-mesh">
            <BackgroundDecorations />
            <div className="flex-1 overflow-auto max-w-4xl w-full px-4">
                <main className="container py-8 space-y-6">
                    {/* Back Button - Only visible on small devices and when not on dashboard */}
                    {activeTab !== 'dashboard' && (
                        <div className="md:hidden mb-4">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className="flex items-center gap-2 bg-cyan-100 text-cyan-600 hover:bg-cyan-200 hover:text-cyan-700 transition-colors px-4 py-2 rounded-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Dashboard</span>
                            </button>
                        </div>
                    )}

                    {/* Navigation - Hidden on small devices */}
                    <div className="hidden md:flex justify-center mb-8">
                        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    {activeTab === 'dashboard' && (
                        <div className="glass-effect rounded-2xl p-6 card-hover">
                            <DashboardTab
                                walletAddress={walletAddress}
                                balance={balance}
                                tokens={tokens || []}
                                solBalance={solBalance}
                                solPrice={solPrice}
                                transactions={transactions}
                                assetDetails={assetDetails}
                                copyToClipboard={copyToClipboard}
                                user={session.data?.user ? { image: session.data.user.image ?? undefined } : undefined}
                                setActiveTab={setActiveTab}
                                firstName={firstName}
                                onLogout={handleLogout}
                            />
                        </div>
                    )}
                    {activeTab === 'send' && (
                        <div className="glass-effect rounded-2xl p-6 card-hover">
                            <SendTab tokens={tokens || []} walletAddress={walletAddress} solBalance={solBalance} solPrice={solPrice} />
                        </div>
                    )}
                    {activeTab === 'receive' && (
                        <div className="glass-effect rounded-2xl p-6 card-hover">
                            <ReceiveTab walletAddress={walletAddress} copyToClipboard={copyToClipboard} />
                        </div>
                    )}
                    {activeTab === 'swap' && (
                        <div className="glass-effect rounded-2xl p-6 card-hover">
                            <SwapTab walletAddress={walletAddress} />
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}


