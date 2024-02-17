
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { FaGithub } from 'react-icons/fa';


const NavBar: React.FC = () => {


    const { provider } = useEthereum();
    const { connect, disconnect, connected } = useConnect();
    const { userInfo } = useAuthCore();
    const [user, setUser] = useState<any | null>(null);


    return (
        <>
            <Box
                zIndex={"tooltip"}
                top={0}
                bg="white"
                pb={4}
                boxShadow={"sm"}
                position={"fixed"}
                w="100%"
                borderBottom={"2px solid red"}
            >

                <Flex
                    bg="#8528c4"
                    color='white'
                    direction="row"
                    justify="space-between"
                    align={"center"}
                    px={[4, 4, 12]}
                    height="60px">

                    {/* Logo or Brand */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold"> Penny Pot</Text>

                    </Box>

                    {/* Links */}
                    <HStack spacing={5}>
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
            </Box>
        </>
    );
};

export default NavBar;
