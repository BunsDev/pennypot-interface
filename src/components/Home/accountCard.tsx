import { primaryBg, primaryGradient } from '@/utils/consts';
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';

const AccountCard = () => {


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
                direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
                justifyContent={["center", "center", "center", "space-between"]}
                alignItems={"center"}
                px={[4, 4, 12]}
            >

                <Box
                    w={["100%", "100%", "100%", "50%"]}

                >
                    <Box
                        h="10px"
                        w="100%"
                        bgGradient={`linear-gradient(to right, ${primaryGradient.join(', ')})`}
                    />
                    <Container
                        p={4}
                        h="250px"
                        w="100%"
                        borderTop={"none"}
                        borderBottom={"2px solid #e2e8f0"}
                        borderRight={"2px solid #e2e8f0"}
                        borderLeft={"2px solid #e2e8f0"}
                        maxW="container.lg"
                        py={8}>
                        {/* Show activities based on quests joined */}
                        <Text fontSize="2xl" mb={4}>My Quest</Text>
                        <Box>
                            {/* Render activities here */}
                        </Box>

                        {/* Buttons to create or join new quest */}
                        <VStack w="100%" justify="space-between" mt={8}>
                            <Button h="50px" w="100%" colorScheme="blue">Create New Quest</Button>
                            <Button h="50px" w="100%" colorScheme="green">Join New Quest</Button>
                        </VStack>
                    </Container>
                </Box>

                {user && (

                    <Box
                        w={["100%", "100%", "100%", "30%"]}
                        bg="gray.200"
                        p={4}
                        h="200px"
                        display={"flex"}
                        flexDir={"column"}
                        alignContent={"flex-start"}
                        justifyContent={"flex-start"}


                    >
                        <Box fontSize={["lg", "lg", "lg", "2xl"]}>You're logged in as  </Box>

                        <VStack
                            w="100%"
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

                            <Box>
                                <Box h="50px" my={1}>
                                    <Flex justify={"space-between"}>
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
                                        </HStack>

                                        <Box
                                            display={"flex"}
                                            flexDir={"column"}
                                            alignContent={"center"}
                                            justifyContent={"center"}
                                        >
                                            <Button bg="rgba(50, 143, 93, 0.1)" onClick={() => {
                                                handleCopy(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "");
                                            }}>
                                                <BiCopy size={24} opacity={0.3} fontWeight={"semibold"} />
                                            </Button>
                                            {showTooltip2 && <Tooltip label="Copied"
                                                isOpen={showTooltip2} placement="top"><Box />
                                            </Tooltip>}
                                        </Box>
                                    </Flex>
                                </Box>
                            </Box>
                        </VStack>

                    </Box>
                )}

                
            </Stack>
        </>
    );
};

export default AccountCard;
