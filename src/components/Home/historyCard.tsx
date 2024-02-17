import { primaryBg, primaryGradient, successGradient } from '@/utils/consts';
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { GiJoin } from 'react-icons/gi';
import { IoAddCircleOutline } from 'react-icons/io5';
import QuestTable from './questTable';
import { GradientButton } from '../Buttons';
import AccountSwitcher from './switchAccounts';


const ActiveCard = () => {


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
        <>
            <Stack
                w="100%"
                direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse"]}
                justifyContent={["center", "center", "center", "space-between"]}
                alignItems={"center"}
                h="fit-content"
                px={[4, 4, 12]}
                bg="white"
                pb={8}
            >

                <Box
                    w={["100%", "100%", "100%", "100%"]}
                    position={"relative"}
                    mt={4}
                    boxShadow={"md"}
                    borderBottomRadius={"15px"}
                >
                    <>
                        <Box
                            borderTopRadius={"15px"}
                            position={"absolute"}
                            h="40px"
                            w="100%"
                            bgGradient={`linear-gradient(to right, ${primaryGradient.join(', ')})`}
                        />
                        <Box
                            borderTopRadius={"15px"}
                            position="absolute"
                            top={0}
                            left={0}
                            bg="whiteAlpha.600"
                            h="60px"
                            right={0}
                            bottom={0}
                            backdropFilter="blur(10px)"
                        />
                    </>

                    <Container
                        px={4}
                        h="fit-content"
                        w="100%"
                        mt={0}
                        borderTop={"none"}
                    // borderBottom={"2px solid #e2e8f0"}
                    // borderRight={"2px solid #e2e8f0"}
                    // borderLeft={"2px solid #e2e8f0"}
                    // maxW="container.lg"
                    >
                        <Box>
                            <Text fontWeight={"semibold"}>Active Quests</Text>

                        </Box>

                        {/* Buttons to create or join new quest */}
                        <HStack w="100%" justify="space-between" mt={8}>
                            <Button
                                opacity={0.7}
                                bg="purple.100"
                                color={"purple.500"}
                                _hover={{
                                    bg: "purple.100",
                                    color: "purple.500"
                                }}
                                leftIcon={<IoAddCircleOutline />}
                                h="50px" w="100%" colorScheme="blue">Create New Quest</Button>
                            <Button
                                opacity={0.7}
                                bg="purple.100"
                                color={"purple.500"}
                                _hover={{
                                    bg: "purple.100",
                                    color: "purple.500"
                                }}
                                leftIcon={<GiJoin />}
                                h="50px" w="100%" colorScheme="green">Join New Quest</Button>
                        </HStack>

                        <QuestTable />

                    </Container>
                </Box >



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
                                            p={3}
                                            spacing={3}
                                        >
                                            <Box as="img" src={renderAvatar(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")} h="40px" w="40px" rounded={"full"} />
                                            <Box fontSize={"sm"}>
                                                <Text fontWeight={"semibold"}> <span style={{
                                                    fontWeight: "bold"
                                                }} >Avalanche Testnet </span></Text>
                                                <Text>{shortenAddress(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")}</Text>
                                            </Box>
                                            <Box
                                                display={"flex"}
                                                flexDir={"column"}
                                                alignContent={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Button bg="transparent" onClick={() => {
                                                    handleCopy(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "");
                                                }}>
                                                    <BiCopy size={24} opacity={0.3} fontWeight={"semibold"} />
                                                </Button>
                                                {showTooltip2 && <Tooltip label="Copied"
                                                    isOpen={showTooltip2} placement="top"><Box />
                                                </Tooltip>}
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

            </Stack >
        </>
    );
};

export default ActiveCard;



// <HStack py={3}>
// <GradientButton
//     h="40px"
//     w="140px"
//     fontSize={"md"}
//     background={successGradient}
// > Connect
// </GradientButton>
// <GradientButton
//     h="40px"
//     w="140px"
//     fontSize={"md"}
//     background={primaryGradient}
// > Sign out
// </GradientButton>

// </HStack>