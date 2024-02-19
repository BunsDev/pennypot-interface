import { useDisclosure } from '@chakra-ui/react';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type ModalContextType = {
    modal: string;
    setModal: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
    children: ReactNode
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }: any) => {


    const { isOpen, onClose, onOpen } = useDisclosure();
    const [modal, setModal] = useState("create");

    const contextValue: ModalContextType = {
        modal,
        setModal,
        isOpen,
        onOpen,
        onClose
    };

    return (
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    );
};

export const useModalProvider = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
