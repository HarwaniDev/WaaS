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
    const [isReviewing, setIsReviewing] = useState(false);
    const [transactionFee, setTransactionFee] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

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
        }
    };

    const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(e.target.value);
    };

    const handleReview = async () => {
        if (!selectedToken || !recipient || !amount) return;

        setIsLoading(true);
        try {
            const requestData = selectedToken.symbol === "SOL"
                ? {
                    publicKey: walletAddress,
                    sol: parseFloat(amount),
                    recipient: recipient
                }
                : {
                    publicKey: walletAddress,
                    mint: selectedToken.mintAddress,
                    amount: parseFloat(amount),
                    recipient: recipient
                };

            const response = await axios.post("/api/getFees", requestData);
            setTransactionFee(response.data.fee);
            setIsReviewing(true);
        } catch (error) {
            console.error("Error fetching fees:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        if (!selectedToken || !recipient || !amount) return;

        setIsLoading(true);
        try {
            const requestData = selectedToken.symbol === "SOL"
                ? {
                    publicKey: walletAddress,
                    sol: parseFloat(amount),
                    recipient: recipient
                }
                : {
                    publicKey: walletAddress,
                    mint: selectedToken.mintAddress,
                    amount: parseFloat(amount) * Math.pow(10, selectedToken.decimals),
                    recipient: recipient
                };

            const response = await axios.post("/api/sendTransaction", requestData);
            setTransactionSignature(response.data.txid);
        } catch (error) {
            console.error("Error sending transaction:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setIsReviewing(false);
        setTransactionFee(null);
        setTransactionSignature(null);
    };

    const handleCopySignature = async () => {
        if (transactionSignature) {
            try {
                await navigator.clipboard.writeText(transactionSignature);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] max-w-2xl mx-auto">
            <Card className="w-full p-6 space-y-6 bg-white border-0 shadow-lg">
                <h2 className="text-2xl font-bold text-center text-cyan-700">Send Assets</h2>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
                        <p className="text-cyan-700">Processing transaction...</p>
                    </div>
                ) : transactionSignature ? (
                    <div className="space-y-4 text-center">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-green-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-semibold text-green-700 mb-2">Transaction Successful!</h3>
                            <p className="text-sm text-green-600 mb-2">Transaction Signature:</p>
                            <div className="flex items-center justify-center gap-2">
                                <p className="text-xs font-mono bg-green-50 p-2 rounded break-all flex-1">
                                    {transactionSignature}
                                </p>
                                <button
                                    onClick={handleCopySignature}
                                    className="p-2 text-green-600 hover:text-green-700 transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copySuccess ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <a
                            href={`https://solscan.io/tx/${transactionSignature}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-cyan-600 hover:text-cyan-700 underline"
                        >
                            View on Solscan
                        </a>
                        <Button
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium"
                            onClick={() => {
                                setSelectedToken(null);
                                setRecipient("");
                                setAmount("");
                                setIsReviewing(false);
                                setTransactionFee(null);
                                setTransactionSignature(null);
                            }}
                        >
                            Send Another Transaction
                        </Button>
                    </div>
                ) : !isReviewing ? (
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
                                    {tokens.map((token, index) => (
                                        <SelectItem key={index} value={token.mintAddress}>
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
                            disabled={!selectedToken || !recipient || !amount || isLoading || (Number(amount) > selectedToken.amount)}
                        >
                            {/* {(Number(amount) < selectedToken!.amount) ? "Insufficient Balance" : isLoading ? "Loading" : "Review"} */}
                            {isLoading ? "Loading..." : selectedToken && (Number(amount) > selectedToken.amount) ? "Insufficient Balance" : "Review Transaction"}
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