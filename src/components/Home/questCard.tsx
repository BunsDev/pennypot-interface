import { primaryGradient } from '@/utils/consts';
import { Box, Flex, Text, Link, Button, Container, HStack, Stack, useClipboard } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import { GiJoin } from 'react-icons/gi';
import { IoAddCircleOutline } from 'react-icons/io5';
import QuestTable from './questTable';
import { FaStar } from 'react-icons/fa6';
import { useAppContext } from '@/contexts/globalContext';
import TokensCard from './tokensCard';
import CreateNewQuestModal from '../modals/create/createNewQuestModal';
import { useModalProvider } from '@/contexts/modalContext';




const QuestCard = () => {


    const { provider } = useEthereum();
    const { connect, disconnect, connected, } = useConnect();
    const { userInfo, } = useAuthCore();
    const { user, setUser, balance, setBalance } = useAppContext()
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { onCopy, setValue } = useClipboard(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")
    const { isOpen, onClose, onOpen, modal, setModal } = useModalProvider();

    return (
        <>
            <Stack
                direction={["column", "column", "column", "row"]}
                spacing={15}
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
                            left={0}
                            bgGradient={`linear-gradient(to right, ${primaryGradient.join(', ')})`}
                        />

                        <Box

                            borderTopRadius={"15px"}
                            position="absolute"
                            top={0}
                            left={0}
                            bg="whiteAlpha.800"
                            h="60px"
                            right={0}
                            bottom={0}
                            backdropFilter="blur(10px)"
                            display={"flex"}
                            alignItems={"center"}

                            px={4}
                        >
                            <HStack mt={-5}>
                                <FaStar />
                                <Text
                                    pl={3}
                                    color={"black.700"}
                                    fontWeight={"semibold"}>My Quests</Text>
                            </HStack>


                        </Box>
                    </>

                    <Container
                        px={4}
                        h="fit-content"
                        w="100%"
                        mt={0}
                        borderTop={"none"}
                    >
                        <Box>
                            <Text fontWeight={"semibold"}>Active Quests</Text>

                        </Box>

                        {/* Buttons to create or join new quest */}
                        <HStack w="100%" justify="space-between" mt={8}>
                            <Button
                                opacity={0.7}
                                bg="#d9f0f8"
                                color={"blue.500"}
                                _hover={{
                                    bg: "#d9f0f8",
                                    color: "blue.500"
                                }}
                                leftIcon={<IoAddCircleOutline />}
                                onClick={() => {
                                    setModal("create");
                                    onOpen();
                                }}
                                h="50px" w="100%" colorScheme="blue">Create New Quest</Button>
                            <Button
                                opacity={0.7}
                                bg="#d9f0f8"
                                color={"blue.500"}
                                _hover={{
                                    bg: "#d9f0f8",
                                    color: "blue.500"
                                }}
                                isDisabled={true}
                                leftIcon={<GiJoin />}
                                // onClick={() => {
                                //     setModal("join");
                                //     onOpen();
                                // }}
                                h="50px" w="100%" colorScheme="green">Join New Quest</Button>
                        </HStack>

                        <Box
                            overflowX={"auto"}
                        >
                            <QuestTable />
                        </Box>

                    </Container>
                </Box >

                <TokensCard />

            </Stack>

            {modal && (
                <CreateNewQuestModal isOpen={isOpen} onClose={onClose} />
            )}

        </>
    );
};

export default QuestCard;




