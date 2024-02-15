import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type AppContextType = {
    showSplashScreen: boolean;
    setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const router = useRouter();

    // App states
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const { provider } = useEthereum();
    const { connect, disconnect, connected } = useConnect();
    const { userInfo } = useAuthCore();


    const contextValue: AppContextType = {
        showSplashScreen,
        setShowSplashScreen
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
