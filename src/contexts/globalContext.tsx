import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CovalentClient } from "@covalenthq/client-sdk";


type AppContextType = {
    showSplashScreen: boolean;
    setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedWallet: string | null;
    setSelectedWallet: React.Dispatch<React.SetStateAction<string | null>>;
    showWallet: boolean;
    setShowWallet: React.Dispatch<React.SetStateAction<boolean>>;
    user: any | null;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    chainName: string;
    setChainName: React.Dispatch<React.SetStateAction<string>>;
    fetchUsersTokens: (chain: any, wallet: string) => any
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
    set: any
};

export const AppProvider: React.FC<AppProviderProps> = ({ children, set }: any) => {
    const router = useRouter();

    // App states
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [showWallet, setShowWallet] = useState(false)
    const [user, setUser] = useState<any | null>(null);
    const [balance, setBalance] = useState<number>(0);
    const [chainName, setChainName] = useState("")


    useEffect(() => {
        // const x = localStorage.getItem("showWallet")
        if (showWallet) {
            if (showWallet) {
                set(true);
            } else {
                set(false)
            }
        }
    }, [showWallet])


    const fetchUsersTokens = async (chain: any, wallet: string) => {
        const covalentApiKey = process.env.NEXT_PUBLIC_COVALENT_API_KEY;
        if (!covalentApiKey) {
            console.error({ error: "no covalent key found" });
        }
        const client = new CovalentClient(covalentApiKey as string);
        try {
            const resp =
                await client.BalanceService.getHistoricalPortfolioForWalletAddress(
                    chain,
                    wallet
                );
            if (resp && resp.data) {
                const tokens = resp.data.items;
                const processedTokens = tokens.map((token: any) => ({
                    name: token.contract_name,
                    symbol: token.contract_ticker_symbol,
                    logo: token.logo_url,
                    address: token.contract_address,
                }));

                const res = { tokens: processedTokens };
                return res;
            }
        } catch (error) {
            console.error(error);
            console.log({ error: "Internal Server Error" });
        }
    }





    const contextValue: AppContextType = {
        showSplashScreen,
        setShowSplashScreen,
        selectedWallet,
        setSelectedWallet,
        showWallet,
        setShowWallet,
        user,
        setUser,
        balance,
        setBalance,
        chainName,
        setChainName,
        fetchUsersTokens
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
