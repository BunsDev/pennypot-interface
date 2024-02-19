
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { FaGithub } from 'react-icons/fa';
import { useAppContext } from '@/contexts/globalContext';
import { useModalProvider } from '@/contexts/modalContext';


const NavBar: React.FC = () => {


    const { } = useAppContext();
    const { provider } = useEthereum();
    const { connect, disconnect, connected } = useConnect();
    const { userInfo } = useAuthCore();
    const [user, setUser] = useState<any | null>(null);
    const { isOpen } = useModalProvider();


    return (
        <>
            <Box
                zIndex={isOpen ? "0" : "tooltip"}
                top={0}
                bg="white"
                pb={4}
                boxShadow={"sm"}
                position={"fixed"}
                w="100%"
                borderBottom={"none"}
            >

                <Flex
                    bg="#004e7d"
                    color='white'
                    direction="row"
                    justify="space-between"
                    alignItems={"flex-end"}
                    align={"center"}
                    px={[4, 4, 12]}
                    height="60px">

                    {/* Logo or Brand */}
                    <Box>
                        <Box
                            bottom={0}
                            h="60px"
                            as="img"
                            src="/logohead.png"
                        />



                    </Box>

                    {/* Links */}
                    <HStack spacing={5}
                        pb={4}
                    >
                        <HStack
                            cursor={"pointer"}
                            target="_blank"
                            href='https://github.com/acgodson/pennypot'
                            borderBottom={"1px solid white"}
                            justifyContent={"center"} alignContent={"center"} as="a" display={"flex"}>
                            <FaGithub />
                            <Text>Source</Text>
                        </HStack>
                        {/* <Link>Tab 2</Link>
                        <Link>Tab 3</Link> */}
                    </HStack>
                </Flex>
            </Box >
        </>
    );
};

export default NavBar;
