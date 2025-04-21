import axios from "axios";

export async function getSolanaPrice(): Promise<number> {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
        return response.data.solana.usd;
    } catch (error) {
        console.error("error getting solana price: ", error);
        return 0;
    }
}


export async function getQuote(inputMint: string, amount: number): Promise<number> {

    try {
        const [heliusResponse, jupResponse] = await Promise.all([
            axios.post(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
                jsonrpc: "2.0",
                id: "test",
                method: "getAsset",
                params: [
                    "7fUAJdStEuGbc3sM84cKRL6yYaaSstyLSU4ve5oovLS7"
                ]
            }),
            axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=So11111111111111111111111111111111111111112&amount=${amount}`)
        ]);
        // console.log(heliusResponse.data.calue.decimals);
        // console.log(jupResponse.data.outAmount);
        return jupResponse.data.outAmount / heliusResponse.data.calue.decimals;

    } catch (error) {
        console.error("error getting quote: ", error);
        return 0;
    }
}

export async function getAssetDetails(mintAddress: string) {
    try {
        const response = await axios.post(`https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
            "jsonrpc": "2.0",
            "id": "test",
            "method": "getAsset",
            "params": [
                mintAddress
            ]
        })

        return {
            name: response.data.result.content.metadata.name,
            symbol: response.data.result.content.metadata.symbol,
            mintAddress: mintAddress,
            decimals: response.data.result.token_info.decimals,
            pricePerToken: response.data.result.token_info.price_per_token
        }
    } catch (error) {

    }
}