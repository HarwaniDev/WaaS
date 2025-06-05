import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";
import { tokens } from "../../../public/assets";
import axios from "axios";

interface QuoteResponse {
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: string;
    slippageBps: number;
    priceImpactPct: number;
    routePlan: any[];
    contextSlot: number;
    timeTaken: number;
}

// Helper to get token info by mint
function getTokenInfo(mint: string | undefined) {
    if (!mint) {
        return { name: 'Unknown', image: '', decimals: 6 };
    }
    return tokens.find(t => t.mint === mint) || { name: mint.slice(0, 4) + '...' + mint.slice(-4), image: '', decimals: 6 };
}

export default function SwapTab({ walletAddress }: { walletAddress: string }) {
    const [inputToken, setInputToken] = useState<string>("");
    const [outputToken, setOutputToken] = useState<string>("");
    const [customInputMint, setCustomInputMint] = useState<string>("");
    const [customOutputMint, setCustomOutputMint] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [quote, setQuote] = useState<QuoteResponse | null>(null);
    const [isCustomInputMint, setIsCustomInputMint] = useState<boolean>(false);
    const [isCustomOutputMint, setIsCustomOutputMint] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isTokenModalOpen, setIsTokenModalOpen] = useState<boolean>(false);
    const [activeTokenType, setActiveTokenType] = useState<'input' | 'output'>('input');
    const [modalCustomMint, setModalCustomMint] = useState("");
    const [modalCustomToken, setModalCustomToken] = useState<any>(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedInputTokenDetails, setSelectedInputTokenDetails] = useState<any>(null);
    const [selectedOutputTokenDetails, setSelectedOutputTokenDetails] = useState<any>(null);

    const checkCustomMint = async (mintAddress: string, type: 'input' | 'output') => {
        // First check if it's in our tokens array
        const existingToken = tokens.find(t => t.mint === mintAddress);
        if (existingToken) {
            return existingToken;
        }

        // If not in tokens array, get details from backend API
        try {
            const response = await axios.post('/api/getAssetDetails', {
                publicKey: walletAddress,
                uniqueMints: [mintAddress]
            });
            const details = response.data && response.data[mintAddress];
            if (details && details.name) {
                return {
                    name: details.name,
                    symbol: details.symbol,
                    mint: mintAddress,
                    image: details.imageLink,
                    decimals: details.decimals
                };
            }
        } catch (error) {
            console.error('Error getting custom token details:', error);
        }
        return null;
    };

    const handleGetQuote = async () => {
        if (!amount || Number(amount) === 0 || (!inputToken && !customInputMint) || (!outputToken && !customOutputMint)) return;

        setLoading(true);
        try {
            // Get token details for custom mints if needed
            let inputTokenInfo = isCustomInputMint
                ? await checkCustomMint(customInputMint, 'input')
                : tokens.find(t => t.mint === inputToken);

            let outputTokenInfo = isCustomOutputMint
                ? await checkCustomMint(customOutputMint, 'output')
                : tokens.find(t => t.mint === outputToken);

            if (!inputTokenInfo || !outputTokenInfo) {
                throw new Error('Invalid token information');
            }

            // Calculate the amount with decimals
            const amountWithDecimals = Math.floor(Number(amount) * Math.pow(10, inputTokenInfo.decimals));

            const response = await axios.post('/api/getQuote', {
                inputMint: isCustomInputMint ? customInputMint : inputToken,
                outputMint: isCustomOutputMint ? customOutputMint : outputToken,
                amount: amountWithDecimals.toString()
            });
            setQuote(response.data.response);
        } catch (error) {
            console.error('Error getting quote:', error);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch quote when amount changes
    useEffect(() => {
        if (!amount || Number(amount) === 0) return;
        handleGetQuote();
    }, [amount, inputToken, outputToken, customInputMint, customOutputMint]);

    // Effect to update quote every 3 seconds
    useEffect(() => {
        if (!amount || Number(amount) === 0 || (!inputToken && !customInputMint) || (!outputToken && !customOutputMint)) return;

        const interval = setInterval(() => {
            handleGetQuote();
        }, 3000);

        return () => clearInterval(interval);
    }, [amount, inputToken, outputToken, customInputMint, customOutputMint]);

    // Fetch custom token details in modal
    useEffect(() => {
        const fetchModalCustom = async () => {
            if (modalCustomMint.length > 20) {
                setModalLoading(true);
                // Check in tokens array first
                const token = tokens.find(t => t.mint === modalCustomMint);
                if (token) {
                    setModalCustomToken(token);
                } else {
                    const details = await checkCustomMint(modalCustomMint, activeTokenType);
                    if (details) {
                        setModalCustomToken(details);
                    } else {
                        setModalCustomToken(null);
                    }
                }
                setModalLoading(false);
            } else {
                setModalCustomToken(null);
            }
        };
        fetchModalCustom();
    }, [modalCustomMint, activeTokenType]);

    const handleTokenSelect = (tokenMint: string, customTokenObj?: any) => {
        if (activeTokenType === 'input') {
            setInputToken(tokenMint);
            setIsCustomInputMint(!!customTokenObj);
            setCustomInputMint(customTokenObj ? tokenMint : "");
            setSelectedInputTokenDetails(customTokenObj || null);
        } else {
            setOutputToken(tokenMint);
            setIsCustomOutputMint(!!customTokenObj);
            setCustomOutputMint(customTokenObj ? tokenMint : "");
            setSelectedOutputTokenDetails(customTokenObj || null);
        }
        setIsTokenModalOpen(false);
        setModalCustomMint("");
        setModalCustomToken(null);
    };

    const openTokenModal = (type: 'input' | 'output') => {
        setActiveTokenType(type);
        setIsTokenModalOpen(true);
        setModalCustomMint("");
        setModalCustomToken(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-4">
            <div className="w-full max-w-md">
                {/* Selling Section */}
                <div className="bg-white rounded-xl p-6 mb-2 shadow-lg border border-cyan-100">
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-cyan-700">Selling</Label>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                        <div 
                            className="flex items-center space-x-2 bg-cyan-100 rounded-lg px-3 py-1 cursor-pointer hover:bg-cyan-200 transition-colors"
                            onClick={() => openTokenModal('input')}
                        >
                            {(selectedInputTokenDetails || inputToken) ? (
                                (() => {
                                    const token = selectedInputTokenDetails || getTokenInfo(inputToken);
                                    return (
                                        <>
                                            {token.image && <img src={token.image} alt={token.symbol ? token.symbol : token.name} className="w-7 h-7 rounded-full" />}
                                            <span className="text-cyan-700 font-bold text-base">{token.symbol ? token.symbol : token.name}</span>
                                            <ChevronDown className="w-4 h-4 text-cyan-700" />
                                        </>
                                    );
                                })()
                            ) : (
                                <>
                                    <span className="text-cyan-700 font-bold text-base">Select Token</span>
                                    <ChevronDown className="w-4 h-4 text-cyan-700" />
                                </>
                            )}
                        </div>
                        <div className="flex-1 text-right">
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border-cyan-200 focus:ring-cyan-500 text-right text-2xl font-bold bg-transparent text-cyan-700"
                                style={{ boxShadow: 'none', border: 'none', background: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Buying Section */}
                <div className="bg-white rounded-xl p-6 mt-2 shadow-lg border border-cyan-100">
                    <div className="flex justify-between items-center mb-2">
                        <Label className="text-cyan-700">Buying</Label>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                        <div
                            className="flex items-center space-x-2 bg-cyan-100 rounded-lg px-3 py-1 cursor-pointer hover:bg-cyan-200 transition-colors"
                            onClick={() => openTokenModal('output')}
                        >
                            {(selectedOutputTokenDetails || outputToken) ? (
                                (() => {
                                    const token = selectedOutputTokenDetails || getTokenInfo(outputToken);
                                    return (
                                        <>
                                            {token.image && <img src={token.image} alt={token.symbol ? token.symbol : token.name} className="w-7 h-7 rounded-full" />}
                                            <span className="text-cyan-700 font-bold text-base">{token.symbol ? token.symbol : token.name}</span>
                                            <ChevronDown className="w-4 h-4 text-cyan-700" />
                                        </>
                                    );
                                })()
                            ) : (
                                <>
                                    <span className="text-cyan-700 font-bold text-base">Select Token</span>
                                    <ChevronDown className="w-4 h-4 text-cyan-700" />
                                </>
                            )}
                        </div>
                        <div className="flex-1 text-right">
                            <Input
                                type="text"
                                value={
                                    !amount || Number(amount) === 0
                                        ? "0"
                                        : quote
                                            ? (Number(quote.outAmount) / Math.pow(10, getTokenInfo(quote.outputMint).decimals)).toLocaleString(undefined, { maximumFractionDigits: 8 })
                                            : ""
                                }
                                readOnly
                                className="border-cyan-200 focus:ring-cyan-500 text-right text-2xl font-bold bg-transparent text-cyan-700 cursor-not-allowed"
                                style={{ boxShadow: 'none', border: 'none', background: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Token Selection Modal */}
                <Sheet open={isTokenModalOpen} onOpenChange={setIsTokenModalOpen}>
                    <SheetContent side="bottom" className="h-[80vh]">
                        <SheetHeader>
                            <SheetTitle>Select Token</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <Input
                                placeholder="Enter custom mint address"
                                value={modalCustomMint}
                                onChange={e => setModalCustomMint(e.target.value)}
                                className="mb-3 border-cyan-200 focus:ring-cyan-500"
                            />
                            {modalLoading && <div className="text-cyan-700 mb-2">Loading...</div>}
                            {modalCustomMint.length > 20 ? (
                                modalCustomToken ? (
                                    <div
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cyan-50 cursor-pointer transition-colors border border-cyan-200 mb-2 bg-cyan-50"
                                        onClick={() => handleTokenSelect(modalCustomMint, modalCustomToken)}
                                    >
                                        <img src={modalCustomToken.image || modalCustomToken.imageLink} alt={modalCustomToken.symbol || modalCustomToken.name} className="w-8 h-8 rounded-full" />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-cyan-900">{modalCustomToken.symbol || modalCustomToken.name}</span>
                                            <span className="text-xs text-cyan-600">{modalCustomMint.slice(0, 4)}...{modalCustomMint.slice(-4)}</span>
                                        </div>
                                    </div>
                                ) : (
                                    !modalLoading && <div className="text-cyan-700 mb-2">No token found</div>
                                )
                            ) : (
                                <div className="grid grid-cols-1 gap-2 max-h-[calc(80vh-180px)] overflow-y-auto">
                                    {tokens.map((token) => (
                                        <div
                                            key={token.mint}
                                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cyan-50 cursor-pointer transition-colors"
                                            onClick={() => handleTokenSelect(token.mint)}
                                        >
                                            <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full" />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-cyan-900">{token.name}</span>
                                                <span className="text-xs text-cyan-600">{token.mint.slice(0, 4)}...{token.mint.slice(-4)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Details Section */}
                {quote && (
                    <div className="mt-4 p-4 border border-cyan-100 rounded-lg bg-white">
                        <div className="flex justify-center items-center flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-cyan-700 text-sm font-medium">
                            <div>Slippage: <span className="text-cyan-900 font-bold">{quote.slippageBps / 100}%</span></div>
                            <div>Swap Mode: <span className="text-cyan-900 font-bold">{quote.swapMode}</span></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 