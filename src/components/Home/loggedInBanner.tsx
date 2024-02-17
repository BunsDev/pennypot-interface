import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import AccountSwitcher from './switchAccounts';
import SwitchAccountModal from '../modals/switchAccountModal';
import { AvalancheTestnet } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { useAppContext } from '@/contexts/globalContext';





const LoggedInBanner = () => {


    const { provider } = useEthereum();
    const { connect, disconnect, connected, } = useConnect();
    const { userInfo, } = useAuthCore();
    const { user, setUser, balance, setBalance } = useAppContext()
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { onCopy, setValue } = useClipboard(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")
    const { isOpen, onClose, onOpen } = useDisclosure();




    const smartAccount = new SmartAccount(provider, {
        projectId: "98918669-373e-42bd-8870-93a3dafbfd97",
        clientKey: "cvjVPH0xSBImGoWP9TZki7YMVrlGEjm3RgEJE7Rh",
        appId: "b8415957-5905-4429-990e-316c1ee806e3",
        aaOptions: {
            simple: [{ chainId: AvalancheTestnet.id, version: '1.0.0' }]
        }
    });



    const handleCopy = (value: string) => {
        onCopy();
        setShowTooltip2(true);
        setTimeout(() => {
            setShowTooltip2(false);
        }, 2000);
    };

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
            {user && (
                <Box
                    w={["100%", "100%", "100%", "100%"]}
                    bg="gray.200"
                    p={4}
                    h="fit-content"
                    display={"flex"}
                    flexDir={"column"}
                    alignContent={"flex-start"}
                    justifyContent={"flex-start"}
                >
                    <Box fontSize={["sm", "sm", "sm", "md"]}>You're logged in as  </Box>

                    <HStack
                        w="100%"
                        spacing={12}
                        justifyContent={"flex-start"}
                        align={"flex-start"}
                    >
                        <Box>
                            <Box h="50px" my={1}>
                                <Flex justify={"space-between"}>
                                    <HStack
                                        p={3}
                                        spacing={3}
                                        w="100%"
                                    >
                                        <Box as="img" src={user.avatar} h="40px" w="40px" rounded={"full"} />
                                        <Box fontSize={"sm"}>
                                            <Text fontWeight={"semibold"}> <span style={{
                                                fontWeight: "bold"
                                            }} >{user.name} </span></Text>
                                            <Text>{user.email}</Text>
                                        </Box>
                                    </HStack>
                                </Flex>
                            </Box>
                        </Box>


                        <Box w="100%">
                            <Box h="fit-content" my={1} w="100%">
                                <Flex justify={"space-between"} align={"center"}>

                                    <HStack
                                        minW="180px"
                                        px={3}
                                        py={1.5}
                                        spacing={3}
                                        borderRadius={"18px"}
                                        border="1px solid gray"
                                        cursor={"pointer"}
                                        onClick={onOpen}
                                    >
                                        <Box as="img" src={renderAvatar(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")} h="40px" w="40px" rounded={"full"} />
                                        <Box fontSize={"sm"}>
                                            <Text fontWeight={"semibold"}> <span style={{
                                                fontWeight: "bold"
                                            }} >
                                                {shortenAddress(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")}
                                            </span></Text>

                                        </Box>

                                    </HStack>

                                    <Box position={"relative"} pr={8}>
                                        <AccountSwitcher />
                                    </Box>

                                </Flex>
                            </Box>
                        </Box>

                    </HStack>

                </Box >
            )}

            <SwitchAccountModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default LoggedInBanner;



