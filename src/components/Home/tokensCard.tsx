import { primaryBg, primaryGradient, successGradient } from '@/utils/consts';
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import QuestTable from './questTable';
import { FaStar } from 'react-icons/fa6';
import { useAppContext } from '@/contexts/globalContext';
import { GiJoin } from 'react-icons/gi';
import TokenTable from './tokenTable';




const TokensCard = () => {


    const { provider } = useEthereum();
    const { connect, disconnect, connected, } = useConnect();
    const { userInfo, } = useAuthCore();
    const { user, setUser, balance, setBalance } = useAppContext()
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <VStack>
            {user && (

                <Box
                    w="fit-content"
                    position={"relative"}
                    mt={4}
                    boxShadow={"md"}
                    borderBottomRadius={"15px"}
                >
                    <>
                        <Box
                            zIndex={-1}
                            borderTopRadius={"15px"}
                            position={"absolute"}
                            h="40px"
                            w="100%"
                            left={0}
                            bgGradient={`linear-gradient(to right, ${primaryGradient.join(', ')})`}
                        />

                        <Box
                            zIndex={-1}
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
                        />

                    </>

                    <Container
                        zIndex={1}
                        px={0}
                        h="fit-content"
                        w="100%"
                        mt={0}
                        borderTop={"none"}
                    >
                        <TokenTable />

                    </Container>
                </Box >
            )}

        </VStack>
    );
};

export default TokensCard;



