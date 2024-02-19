// This is a simplified example, adjust it according to your project structure and requirements

// import axios from "axios";
import { CovalentClient } from "@covalenthq/client-sdk";

export default async function handler(req: any, res: any) {
  const covalentApiKey = process.env.COVALENT_API_KEY;
  if (!covalentApiKey) {
    res.status(500).json({ error: "no covalent key found" });
  }
  const client = new CovalentClient(covalentApiKey as string);

  try {
    console.log(req.query.chain);

  
    const resp =
      await client.BalanceService.getHistoricalPortfolioForWalletAddress(
        req.query.chain,
        req.query.wallet
      );
    if (resp && resp.data) {
      const tokens = resp.data.items;
      const processedTokens = tokens.map((token: any) => ({
        name: token.contract_name,
        symbol: token.contract_ticker_symbol,
        logo: token.logo_url,
        address: token.contract_address,
      }));

      res.status(200).json({ tokens: processedTokens });
    }
    // console.log(resp.data.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
