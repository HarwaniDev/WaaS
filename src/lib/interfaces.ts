export interface Token {
    name: string;
    symbol: string;
    mintAddress: string;
    decimals: number;
    pricePerToken: number;
    amount: number;
    imageLink: string;
}

export interface Transaction {
    id: string;
    signature: string;
    timestamp: string;
    sender: string;
    reciever: string;
    mint?: string;
    decimals?: number;
    amount?: string;
    tokenAmount?: string;
    fees: string;
    type: "NATIVE" | "TOKEN";
    solWalletId: string;
    createdAt: Date;
    updatedAt: Date;
}