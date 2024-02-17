import "@/styles/globals.css";
import "@covalenthq/goldrush-kit/styles.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { AuthType } from '@particle-network/auth-core';
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import { GoldRushProvider } from "@covalenthq/goldrush-kit";
import { AppProvider } from "@/contexts/globalContext";
import { useEffect, useState } from "react";
import { COVALENT_API_KEY } from "@/utils/consts";


export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  const [showWallet, setShowWallet] = useState(false);

  const mode: any = theme;

  return (
    <AppProvider set={setShowWallet}>
      <AuthCoreContextProvider
        options={{
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
          clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
          appId: process.env.NEXT_PUBLIC_APP_ID!,
          authTypes: [AuthType.email, AuthType.google, AuthType.apple, AuthType.twitter],
          erc4337: {
            name: 'SIMPLE',
            version: '1.0.0',
          },
          wallet: {
            visible: showWallet,
            customStyle: {
              supportChains: [AvalancheTestnet],
              evmSupportWalletConnect: true
            }
          }
        }}
      >
        <ChakraProvider resetCSS={true}>
          <GoldRushProvider apikey={COVALENT_API_KEY || ""} mode={mode} color={"slate"} border_radius={"medium"}>
            <Component {...pageProps} />
          </GoldRushProvider>
        </ChakraProvider>
      </AuthCoreContextProvider>
    </AppProvider>
  );
}

