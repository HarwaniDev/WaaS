import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Token } from "@/lib/interfaces";
import axios from "axios";

interface SendTabProps {
    tokens?: Token[];
    walletAddress?: string;
    solBalance?: number;
    solPrice?: number;
}

export default function SendTab({ tokens = [], walletAddress = "", solBalance = 0, solPrice = 0 }: SendTabProps) {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [showTransactionDetails, setShowTransactionDetails] = useState(false);
    const [isReviewing, setIsReviewing] = useState(false);
    const [transactionFee, setTransactionFee] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Update SOL token when solBalance or solPrice changes
    useEffect(() => {
        if (selectedToken?.symbol === "SOL") {
            setSelectedToken(prev => prev ? {
                ...prev,
                amount: solBalance,
                pricePerToken: solPrice
            } : null);
        }
    }, [solBalance, solPrice, selectedToken?.symbol]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setShowTransactionDetails(value !== "" && recipient !== "");
        }
    };

    const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(e.target.value);
        setShowTransactionDetails(e.target.value !== "" && amount !== "");
    };

    const handleReview = async () => {
        if (!selectedToken || !recipient || !amount) return;
        
        setIsLoading(true);
        try {
            const response = await axios.post("/api/getFees", {
                publicKey: walletAddress,
                sol: selectedToken.symbol === "SOL" ? parseFloat(amount) : 0,
                recipient: recipient
            });
            setTransactionFee(response.data.fee);
            setIsReviewing(true);
        } catch (error) {
            console.error("Error fetching fees:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        // TODO: Implement send functionality
        console.log("Sending transaction:", {
            token: selectedToken,
            recipient,
            amount,
            fee: transactionFee
        });
    };

    const handleBack = () => {
        setIsReviewing(false);
        setTransactionFee(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] max-w-2xl mx-auto">
            <Card className="w-full p-6 space-y-6 bg-white border-0 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-cyan-700">Send Assets</h2>
                
                {!isReviewing ? (
                    <>
                        {/* Token Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="token" className="text-cyan-700">Select Token</Label>
                            <Select onValueChange={(value: string) => {
                                if (value === "SOL") {
                                    setSelectedToken({
                                        name: "Solana",
                                        symbol: "SOL",
                                        mintAddress: "SOL",
                                        amount: 0, // This will be updated with actual balance
                                        imageLink: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
                                        decimals: 9,
                                        pricePerToken: 0 // This will be updated with actual price
                                    });
                                } else {
                                    const token = tokens.find(t => t.mintAddress === value);
                                    setSelectedToken(token || null);
                                }
                            }}>
                                <SelectTrigger className="border-cyan-200 focus:ring-cyan-500">
                                    <SelectValue placeholder="Select a token" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SOL">
                                        <div className="flex items-center gap-2">
                                            <img 
                                                src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" 
                                                alt="Solana" 
                                                className="w-6 h-6 rounded-full" 
                                            />
                                            <span>Solana (SOL)</span>
                                        </div>
                                    </SelectItem>
                                    {tokens.map((token) => (
                                        <SelectItem key={token.mintAddress} value={token.mintAddress}>
                                            <div className="flex items-center gap-2">
                                                <img src={token.imageLink} alt={token.name} className="w-6 h-6 rounded-full" />
                                                <span>{token.name} ({token.symbol})</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Recipient Address */}
                        <div className="space-y-2">
                            <Label htmlFor="recipient" className="text-cyan-700">Recipient Address</Label>
                            <Input
                                id="recipient"
                                placeholder="Enter recipient's wallet address"
                                value={recipient}
                                onChange={handleRecipientChange}
                                className="border-cyan-200 focus:ring-cyan-500"
                            />
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-cyan-700">Amount</Label>
                            <Input
                                id="amount"
                                type="text"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={handleAmountChange}
                                className="border-cyan-200 focus:ring-cyan-500"
                            />
                            {selectedToken && (
                                <p className="text-sm text-cyan-500">
                                    Available: {selectedToken.amount} {selectedToken.symbol}
                                </p>
                            )}
                        </div>

                        {/* Review Button */}
                        <Button 
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                            onClick={handleReview}
                            disabled={!selectedToken || !recipient || !amount || isLoading}
                        >
                            {isLoading ? "Loading..." : "Review Transaction"}
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Transaction Details */}
                        <div className="space-y-3 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                            <h3 className="font-semibold text-cyan-700">Transaction Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-cyan-600">From:</span>
                                    <span className="text-cyan-700">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cyan-600">To:</span>
                                    <span className="text-cyan-700">{recipient.slice(0, 4)}...{recipient.slice(-4)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cyan-600">Token:</span>
                                    <span className="text-cyan-700">{selectedToken?.name} ({selectedToken?.symbol})</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cyan-600">Value:</span>
                                    <span className="text-cyan-700">{amount} {selectedToken?.symbol}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-cyan-600">Transaction Fee:</span>
                                    <span className="text-cyan-700">{transactionFee ? `${transactionFee / 1e9} SOL` : "Loading..."}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button 
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button 
                                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                                onClick={handleSend}
                                disabled={!transactionFee}
                            >
                                Confirm and Send
                            </Button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
} 