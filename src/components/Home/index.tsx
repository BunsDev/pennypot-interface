import { primaryBg, primaryGradient } from '@/utils/consts';
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import Banner from './banner';
import NavBar from './navbar';
import ActiveCard from './activeCard';

const Home: React.FC = () => {
    const { provider } = useEthereum();
    const { connect, disconnect, connected } = useConnect();
    const { userInfo } = useAuthCore();
    const [user, setUser] = useState<any | null>(null);
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { onCopy, setValue } = useClipboard(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")


    useEffect(() => {
        if (userInfo) {
            const obj = {
                avatar: userInfo.avatar,
                name: userInfo.name,
                email: userInfo.thirdparty_user_info?.user_info.email
            }
            // console.log(obj)
            setUser(obj)
        }
    }, [userInfo])


    const handleCopy = (value: string) => {
        // alert(value);
        onCopy();
        setShowTooltip2(true);
        setTimeout(() => {
            setShowTooltip2(false);
        }, 2000);
    };




    return (
        <Box w="100%">

            <NavBar />
            {/* 
            <Banner
                title='Your Account'
            /> */}

            <VStack
                py={8}
            >
                {/* <AccountCard /> */}

                <ActiveCard />

            </VStack>
        </Box >
    );
};

export default Home;
