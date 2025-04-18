import axios from "axios";

export async function getSolanaPrice(): Promise<number> {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    return response.data.solana.usd;
}


export async function getQuote(inputMint: string, outputMint: string, amount: number) {
    const response = await axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}\
                                        &outputMint=${outputMint}\
                                        &amount=${amount}`);
    return response.data;
}