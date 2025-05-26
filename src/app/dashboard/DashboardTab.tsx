import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Download, Send, Upload, Wallet } from "lucide-react";
import React from "react";

import type { Token, Transaction } from "@/lib/interfaces";

interface DashboardTabProps {
    walletAddress: string;
    balance: string;
    tokens: Token[];
    solBalance: number;
    solPrice: number;
    transactions: Transaction[];
    assetDetails: { [key: string]: any };
    copyToClipboard: () => void;
    user?: { image?: string; };
    activeTab: 'dashboard' | 'send' | 'receive' | 'swap';
    setActiveTab: (tab: 'dashboard' | 'send' | 'receive' | 'swap') => void;
    firstName?: string;
}

export default function DashboardTab({ walletAddress, balance, tokens, solBalance, solPrice, transactions, assetDetails, copyToClipboard, user, activeTab, setActiveTab, firstName }: DashboardTabProps) {
    return (
        <div className="grid gap-8">
            <Card className="overflow-hidden bg-white border-0 shadow-lg">
                {/* Top bar: WaaS + Wallet logo left, user image and name right */}
                <div className="flex justify-between items-center px-6 pt-6 pb-2">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-7 w-7 text-cyan-500" />
                        <span className="text-xl font-bold text-cyan-600">WaaS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {user?.image && (
                            <div className="rounded-full h-12 w-12 bg-cyan-100 flex items-center justify-center overflow-hidden border-2 border-cyan-400">
                                <img src={user.image} alt="User" className="h-full w-full object-cover" />
                            </div>
                        )}
                        <span className="text-lg font-semibold text-cyan-700">{firstName || 'User'}</span>
                    </div>
                </div>
                {/* Navigation Bar */}
                <nav className="flex gap-4 px-8 py-2 rounded-xl mt-4 w-3/4 mx-auto bg-white border border-cyan-100 shadow-sm justify-center">
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-600 border border-cyan-200 hover:bg-cyan-50'}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'send' ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-600 border border-cyan-200 hover:bg-cyan-50'}`}
                        onClick={() => setActiveTab('send')}
                    >
                        Send
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'receive' ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-600 border border-cyan-200 hover:bg-cyan-50'}`}
                        onClick={() => setActiveTab('receive')}
                    >
                        Receive
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'swap' ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-600 border border-cyan-200 hover:bg-cyan-50'}`}
                        onClick={() => setActiveTab('swap')}
                    >
                        Swap
                    </button>
                </nav>
                {/* Wallet Card Main */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 p-6 text-white rounded-b-2xl mt-4">
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
                <CardContent className="p-0 bg-white">
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
                                            <img src="solana.png" alt="Solana" className="rounded-full" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-cyan-700">Solana</p>
                                            <p className="text-sm text-cyan-400">Sol</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-cyan-700">{Number(solBalance).toFixed(2)}</p>
                                        <p className="text-sm text-cyan-400">${(solBalance * solPrice).toFixed(2)}</p>
                                    </div>
                                </div>
                                {tokens?.map((token: Token, key: number) => {
                                    if (!token.name) {
                                        return null;
                                    }
                                    return (
                                        <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                                    <img src={token.imageLink} alt={token.name} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-cyan-700">{token.name}</p>
                                                    <p className="text-sm text-cyan-400">{token.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-cyan-700">{Number(token.amount).toFixed(2)}</p>
                                                <p className="text-sm text-cyan-400">{token.pricePerToken ? <>${(token.amount * token.pricePerToken).toFixed(2)}</> : <>-</>}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                        <TabsContent value="activity" className="p-6 space-y-6 m-0">
                            <div className="grid gap-4">
                                {transactions.map((tx: Transaction, index: number) => {
                                    const isSender = tx.sender === walletAddress;
                                    const amount = tx.type === "NATIVE"
                                        ? Number(tx.amount) / Math.pow(10, 9)
                                        : Number(tx.tokenAmount);
                                    const formattedAmount = amount;
                                    const tokenDetails = tx.type === "TOKEN" && tx.mint
                                        ? tokens?.find((t: Token) => t.mintAddress === tx.mint)
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
                                                    <p className="font-medium text-cyan-700">
                                                        {isSender ? `Sent ${symbol}` : `Received ${symbol}`}
                                                    </p>
                                                    <p className="text-sm text-cyan-400">{formattedDate}</p>
                                                    <p className="text-xs text-cyan-400">
                                                        {isSender ? 'To: ' : 'From: '}
                                                        {isSender ? tx.reciever : tx.sender}
                                                    </p>
                                                    {tx.type === "TOKEN" && tx.mint && (
                                                        <>
                                                            <p className="text-xs text-cyan-400">
                                                                Mint: {tx.mint.slice(0, 4)}...{tx.mint.slice(-4)}
                                                            </p>
                                                            {assetDetails[tx.mint] && (
                                                                <p className="text-xs text-cyan-400">
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
                                                <p className="text-sm text-cyan-400">
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
        </div>
    );
} 