import { Box } from '@chakra-ui/react';
import { useEthereum, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, } from 'react';
import { AvalancheTestnet } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { useAppContext } from '@/contexts/globalContext';
import QuestCard from './questCard';
import LoggedInBanner from './loggedInBanner';


const ActiveCard = () => {

    const { provider } = useEthereum();
    const { userInfo, } = useAuthCore();
    const { user, setUser, setBalance } = useAppContext()


    const smartAccount = new SmartAccount(provider, {
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,
        aaOptions: {
            simple: [{ chainId: AvalancheTestnet.id, version: '1.0.0' }]
        }
    });


    const fetchBalance = async () => {
        if (!userInfo) {
            return
        }
        const address = await smartAccount.getAddress();
        const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
        const balanceResponse = await customProvider.getBalance(address);
        const obj = {
            avatar: userInfo.avatar,
            name: userInfo.name,
            email: userInfo.thirdparty_user_info?.user_info.email,
            particleWallet: await smartAccount.getOwner(),
            smartWallet: await smartAccount.getAddress(),
            smartAccount: smartAccount
        }
        setUser(obj)
        setBalance(parseFloat(ethers.utils.formatEther(balanceResponse)));
    };

    useEffect(() => {
        if (userInfo && smartAccount && !user) {
            fetchBalance();
        }
    }, [userInfo, smartAccount, user])


    return (
        <>
            <Box
                w="100%"
                px={[4, 4, 12]}
                pb={8}
                position={"relative"}
            >
                <Box>
                    <LoggedInBanner />
                </Box>
                <Box>
                    <QuestCard />
                </Box>
            </Box >
        </>
    );
};

export default ActiveCard;

