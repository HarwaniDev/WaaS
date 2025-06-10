import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Download, LogOut, Send, Upload } from "lucide-react";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Token, Transaction } from "@/lib/interfaces";

interface DashboardTabProps {
    walletAddress: string;
    balance: string;
    tokens: Token[];
    solBalance: number;
    solPrice: number;
    transactions: Transaction[];
    assetDetails: { [key: string]: { name: string; symbol: string; imageLink: string; decimals: number } };
    copyToClipboard: () => void;
    user?: { image?: string; };
    setActiveTab: (tab: 'dashboard' | 'send' | 'receive' | 'swap') => void;
    firstName?: string;
    onLogout?: () => void;
}

export default function DashboardTab({ walletAddress, balance, tokens, solBalance, solPrice, transactions, assetDetails, copyToClipboard, user, setActiveTab, firstName, onLogout }: DashboardTabProps) {
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 3);

    return (
        <div className="grid gap-8">
            <Card className="overflow-hidden bg-white border-0 shadow-lg">
                <div className="flex justify-between items-center px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                                {user?.image && (
                                    <div className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-cyan-100 flex items-center justify-center overflow-hidden border-2 border-cyan-400">
                                        <img src={user.image} alt="User" className="h-full w-full object-cover" />
                                    </div>
                                )}
                                <span className="text-base sm:text-lg font-semibold text-cyan-700">{firstName || 'User'}</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] sm:w-[400px] h-[90%] top-[5%] rounded-l-2xl border-l">
                            <SheetHeader className="mt-8">
                                <SheetTitle className="text-left">Profile Settings</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-3 mt-8 mb-8">
                                    {user?.image && (
                                        <div className="rounded-full h-16 w-16 ml-4 bg-cyan-100 flex items-center justify-center overflow-hidden border-2 border-cyan-400">
                                            <img src={user.image} alt="User" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-semibold">{firstName || 'User'}</h2>
                                        <p className="text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <Button 
                                        variant="destructive" 
                                        className="w-3/4 gap-2 justify-start cursor-pointer"
                                        onClick={onLogout}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                                    
                {/* Wallet Card Main */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 p-4 sm:p-6 text-white rounded-b-2xl -mt-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
                        <div>
                            <h2 className="text-sm font-medium opacity-80">Your Wallet</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm">{walletAddress.slice(0, 3)}...{walletAddress.slice(-3)}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer"
                                    onClick={copyToClipboard}
                                >
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-cyan-500 hover:bg-white/90 border-0 flex-1 sm:flex-none cursor-pointer text-xs sm:text-sm px-2 sm:px-4"
                                onClick={() => setActiveTab('receive')}
                            >
                                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Receive
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-cyan-500 hover:bg-white/90 border-0 flex-1 sm:flex-none cursor-pointer text-xs sm:text-sm px-2 sm:px-4"
                                onClick={() => setActiveTab('send')}
                            >
                                <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Send
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="bg-white text-cyan-500 hover:bg-white/90 border-0 flex-1 sm:flex-none sm:hidden cursor-pointer text-xs sm:text-sm px-2 sm:px-4"
                                onClick={() => setActiveTab('swap')}
                            >
                                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Swap
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium opacity-80">Total Balance</h3>
                        <p className="text-2xl sm:text-3xl font-bold">${balance} USD</p>
                    </div>
                </div>

                {/* Main Content - Only visible on desktop */}
                <CardContent className="p-0 bg-white hidden sm:block">
                    <Tabs defaultValue="assets" className="w-full">
                        <div className="border-b px-4 sm:px-6">
                            <TabsList className="bg-transparent border-b-0 -mb-px">
                                <TabsTrigger
                                    value="assets"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none text-sm sm:text-base"
                                >
                                    Assets
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none text-sm sm:text-base"
                                >
                                    Activity
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <TabsContent value="assets" className="p-4 sm:p-6 space-y-4 sm:space-y-6 m-0">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center">
                                            <img src="solana.png" alt="Solana" className="rounded-full" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-cyan-700 text-sm sm:text-base">Solana</p>
                                            <p className="text-xs sm:text-sm text-cyan-400">Sol</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-cyan-700 text-sm sm:text-base">{Number(solBalance)}</p>
                                        <p className="text-xs sm:text-sm text-cyan-400">${Number(solBalance * solPrice).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                    </div>
                                </div>
                                {tokens?.map((token: Token) => {
                                    if (!token.name) {
                                        return null;
                                    }
                                    return (
                                        <div key={token.mintAddress} className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                                                    <img src={token.imageLink} alt={token.name} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-cyan-700 text-sm sm:text-base">{token.name}</p>
                                                    <p className="text-xs sm:text-sm text-cyan-400">{token.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-cyan-700 text-sm sm:text-base">{Number(token.amount)}</p>
                                                <p className="text-xs sm:text-sm text-cyan-400">{token.pricePerToken ? <>${Number(token.amount * token.pricePerToken).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</> : <>-</>}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                        <TabsContent value="activity" className="p-4 sm:p-6 space-y-4 sm:space-y-6 m-0">
                            <div className="grid gap-4">
                                {transactions.length === 0 &&
                                 <div className="flex justify-center items-center text-sm sm:text-base">
                                 No Transactions
                                </div>}
                                {displayedTransactions.map((tx: Transaction) => {
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
                                        <div key={tx.signature} className="flex items-center justify-between p-3 sm:p-4 border-b">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    {isSender ? <Upload className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" /> : <Download className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-cyan-700 text-sm sm:text-base">
                                                        {isSender ? `Sent ${symbol}` : `Received ${symbol}`}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-cyan-400">{formattedDate}</p>
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
                                                <p className="text-xs sm:text-sm text-cyan-400">
                                                    ${Number(amount * (tx.type === "TOKEN" ? Number(tokenDetails?.pricePerToken || 0) : solPrice)).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 5})}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {transactions.length > 3 && (
                                    <Button 
                                        variant="outline" 
                                        className="flex items-center gap-2 w-full cursor-pointer"
                                        onClick={() => setShowAllTransactions(!showAllTransactions)}
                                    >
                                        <ArrowRight className={`h-4 w-4 transition-transform ${showAllTransactions ? 'rotate-180' : ''}`} />
                                        {showAllTransactions ? 'View Less Transactions' : 'View All Transactions'}
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>

                {/* Mobile Transactions View */}
                <div className="sm:hidden bg-white p-4">
                    <Tabs defaultValue="assets" className="w-full">
                        <div className="border-b mb-4">
                            <TabsList className="bg-transparent border-b-0 -mb-px w-full justify-start">
                                <TabsTrigger
                                    value="assets"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none text-sm"
                                >
                                    Assets
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none rounded-none text-sm"
                                >
                                    Activity
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="assets" className="m-0">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full flex items-center justify-center">
                                            <img src="solana.png" alt="Solana" className="rounded-full" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-cyan-700">Solana</p>
                                            <p className="text-xs text-cyan-400">Sol</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-sm text-cyan-700">{Number(solBalance)}</p>
                                        <p className="text-xs text-cyan-400">${Number(solBalance * solPrice).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                    </div>
                                </div>
                                {tokens?.map((token: Token) => {
                                    if (!token.name) {
                                        return null;
                                    }
                                    return (
                                        <div key={token.mintAddress} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                                                    <img src={token.imageLink} alt={token.name} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-cyan-700">{token.name}</p>
                                                    <p className="text-xs text-cyan-400">{token.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-sm text-cyan-700">{Number(token.amount)}</p>
                                                <p className="text-xs text-cyan-400">{token.pricePerToken ? <>${Number(token.amount * token.pricePerToken).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</> : <>-</>}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>

                        <TabsContent value="activity" className="m-0">
                            <div className="space-y-3">
                                {transactions.length === 0 && (
                                    <div className="text-center text-sm text-gray-500 py-4">
                                        No Transactions
                                    </div>
                                )}
                                {displayedTransactions.map((tx: Transaction) => {
                                    const isSender = tx.sender === walletAddress;
                                    const amount = tx.type === "NATIVE"
                                        ? Number(tx.amount) / Math.pow(10, 9)
                                        : Number(tx.tokenAmount);
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
                                        <div key={tx.signature} className="bg-slate-50 rounded-lg p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                        {isSender ? <Upload className="h-3 w-3 text-green-500" /> : <Download className="h-3 w-3 text-green-500" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm text-cyan-700">
                                                            {isSender ? `Sent ${symbol}` : `Received ${symbol}`}
                                                        </p>
                                                        <p className="text-xs text-cyan-400">{formattedDate}</p>
                                                    </div>
                                                </div>
                                                <p className={`font-medium text-sm ${isSender ? 'text-red-500' : 'text-green-500'}`}>
                                                    {isSender ? '-' : '+'}{amount} {symbol}
                                                </p>
                                            </div>
                                            <div className="text-xs text-cyan-400">
                                                <p>{isSender ? 'To: ' : 'From: '}{isSender ? tx.reciever : tx.sender}</p>
                                                {tx.type === "TOKEN" && tx.mint && (
                                                    <p className="truncate">Mint: {tx.mint}</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {transactions.length > 3 && (
                                    <Button 
                                        variant="outline" 
                                        className="w-full text-sm cursor-pointer"
                                        onClick={() => setShowAllTransactions(!showAllTransactions)}
                                    >
                                        {showAllTransactions ? 'View Less' : 'View All'}
                                    </Button>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    );
} 