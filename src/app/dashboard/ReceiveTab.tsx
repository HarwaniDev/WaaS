import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function ReceiveTab({ walletAddress, copyToClipboard }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4">Receive Assets</h2>
            <p className="text-muted-foreground mb-4">Share your address to receive assets. (Coming soon)</p>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground truncate max-w-[150px]">{walletAddress}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={copyToClipboard}>
                    <Copy className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
} 