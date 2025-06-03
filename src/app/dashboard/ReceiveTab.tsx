import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ReceiveTabProps {
    walletAddress: string;
    copyToClipboard: () => void;
}

export default function ReceiveTab({ walletAddress, copyToClipboard }: ReceiveTabProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">Receive Assets</h2>
            <p className="text-muted-foreground mb-4">Share your address to receive assets.</p>
            
            <div className="bg-white p-4 rounded-lg mb-4">
                <QRCodeSVG value={walletAddress} size={200} />
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-muted-foreground truncate max-w-[150px]">{walletAddress}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={copyToClipboard}>
                    <Copy className="h-3 w-3" />
                </Button>
            </div>

            <p className="text-sm text-yellow-600 mt-2">This address can only receive assets on Solana</p>
        </div>
    );
} 