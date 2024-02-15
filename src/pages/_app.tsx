import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';
import { AuthCoreContextProvider } from '@particle-network/auth-core-modal';
import { AppProvider } from "@/contexts/globalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,
        erc4337: {
          name: 'PENNYPOT',
          version: '1.0.0',
        },
        wallet: {
          visible: true,
          customStyle: {
            supportChains: [AvalancheTestnet],
          }
        }
      }}
    >
      <AppProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppProvider>
    </AuthCoreContextProvider>
  );
}
