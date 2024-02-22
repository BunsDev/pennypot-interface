import { ethers } from "ethers";
import {
  SecretsManager,
  buildRequestCBOR,
  Location,
  CodeLanguage,
} from "@chainlink/functions-toolkit";


import { source } from "@/utils/source";

export default async function handler(req: any, res: any) {
  try {
    const routerAddress = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";
    const donId = "fun-avalanche-fuji-1";
    const gatewayUrls = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ];

    const args = [req.query.chain, req.query.wallet, req.query.token];

    const secrets = { apiKey: process.env.COVALENT_API_KEY };
    if (!secrets.apiKey) {
      res.status(500).json({ error: "no secrets found" });
    }

    const slotIdNumber = 0;
    const expirationTimeMinutes = 150;
    const gasLimit = 300000;

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private key not provided");

    const rpcUrl = process.env.FUJI_RPC_URL;
    if (!rpcUrl) throw new Error("RPC URL not provided");

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);

    const secretsManager = new SecretsManager({
      signer: signer,
      functionsRouterAddress: routerAddress,
      donId: donId,
    });
    await secretsManager.initialize();

    const encryptedSecretsObj = await secretsManager.encryptSecrets(
      secrets as any
    );

    const uploadResult = await secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls: gatewayUrls,
      slotId: slotIdNumber,
      minutesUntilExpiration: expirationTimeMinutes,
    });

    if (!uploadResult.success)
      throw new Error("Encrypted secrets not uploaded");

    const donHostedSecretsVersion = parseInt(uploadResult.version.toString());
    const donHostedEncryptedSecretsReference =
      secretsManager.buildDONHostedEncryptedSecretsReference({
        slotId: slotIdNumber,
        version: donHostedSecretsVersion,
      });

    const functionsRequestBytesHexString = buildRequestCBOR({
      codeLocation: Location.Inline,
      codeLanguage: CodeLanguage.JavaScript,
      secretsLocation: Location.DONHosted,
      source: source,
      encryptedSecretsReference: donHostedEncryptedSecretsReference,
      args: args,
      bytesArgs: [],
    });

    res.status(200).json({ hash: functionsRequestBytesHexString });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
}
