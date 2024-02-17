import { primaryBg, primaryGradient, successGradient } from '@/utils/consts';
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { GiJoin } from 'react-icons/gi';
import { IoAddCircleOutline } from 'react-icons/io5';
import QuestTable from './questTable';
import { GradientButton } from '../Buttons';
import AccountSwitcher from './switchAccounts';
import { FaStar } from 'react-icons/fa6';
import SwitchAccountModal from '../modals/switchAccountModal';
import { AvalancheTestnet } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { useAppContext } from '@/contexts/globalContext';
import TokensCard from './tokensCard';




const QuestCard = () => {


    const { provider } = useEthereum();
    const { connect, disconnect, connected, } = useConnect();
    const { userInfo, } = useAuthCore();
    const { user, setUser, balance, setBalance } = useAppContext()
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { onCopy, setValue } = useClipboard(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] || "")
    const { isOpen, onClose, onOpen } = useDisclosure();



    return (
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
                        bg="whiteAlpha.600"
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


            <TokensCard />




        </Stack>
    );
};

export default QuestCard;




