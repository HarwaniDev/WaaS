import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Token } from "@/lib/interfaces";

interface SendTabProps {
    tokens?: Token[];
    walletAddress?: string;
}

export default function SendTab({ tokens = [], walletAddress = "" }: SendTabProps) {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [showTransactionDetails, setShowTransactionDetails] = useState(false);

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

    const handleSend = () => {
        // TODO: Implement send functionality
        console.log("Sending transaction:", {
            token: selectedToken,
            recipient,
            amount,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] max-w-2xl mx-auto">
            <Card className="w-full p-6 space-y-6 bg-white border-0 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-cyan-700">Send Assets</h2>
                
                {/* Token Selection */}
                <div className="space-y-2">
                    <Label htmlFor="token" className="text-cyan-700">Select Token</Label>
                    <Select onValueChange={(value: string) => {
                        const token = tokens.find(t => t.mintAddress === value);
                        setSelectedToken(token || null);
                    }}>
                        <SelectTrigger className="border-cyan-200 focus:ring-cyan-500">
                            <SelectValue placeholder="Select a token" />
                        </SelectTrigger>
                        <SelectContent>
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

                {/* Transaction Details */}
                {showTransactionDetails && selectedToken && (
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
                                <span className="text-cyan-700">{selectedToken.name} ({selectedToken.symbol})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-600">Value:</span>
                                <span className="text-cyan-700">{amount} {selectedToken.symbol}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-cyan-600">Transaction Fee:</span>
                                <span className="text-cyan-700">~0.000005 SOL</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Send Button */}
                <Button 
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                    onClick={handleSend}
                    disabled={!selectedToken || !recipient || !amount}
                >
                    Confirm and Send
                </Button>
            </Card>
        </div>
    );
} 