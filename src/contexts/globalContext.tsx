import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


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
        setChainName
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
