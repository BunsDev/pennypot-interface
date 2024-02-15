import { primaryBg, primaryGradient } from '@/utils/consts';
import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack } from '@chakra-ui/react';

const Profile: React.FC = () => {
    return (
        <Box>
            {/* Navigation */}
            <Box
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
                    alignContent={"center"}
                    pb={4}
                    px={4}
                    height="60px">

                    {/* Logo or Brand */}
                    <Box>
                        <Text fontSize="xl" fontWeight="bold"> Penny Pot</Text>

                    </Box>

                    {/* Navigation Tabs */}
                    <HStack spacing={5}>
                        <Link>Tab 1</Link>
                        <Link>Tab 2</Link>
                        <Link>Tab 3</Link>
                    </HStack>
                </Flex>
            </Box>

            <Box
                bg="#8528c4"
                color="white"
                h="20vh"
                mt="80px"
            >
                <VStack
                    h="100%"
                    px={3}
                    justify="center"
                    align={"flex-start"}
                >
                    <Heading fontWeight="bold">Your Account</Heading>
                </VStack>

            </Box>


            {/* Scoreboard */}
            {/* <Box
                display={["none", "none", "none", "block"]}
                bg="red"
                position="fixed" right={0} top={0} p={4}>
                {/* Display scoreboard here */}
            {/* <Text>Scoreboard</Text>
            </Box> */}

            {/* Main Content */}
            <VStack
                px={4}
                w="100%"
                mt={16}

            >
                <Stack
                    w="100%"
                    direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
                    justifyContent={["center", "center", "center", "space-between"]}
                    alignItems={"center"}
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
                            <Text fontSize="2xl" mb={4}>Penny Pot Quest</Text>
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


                    <Box
                        w={["100%", "100%", "100%", "30%"]}
                        bg="gray.200"
                        p={4}
                        h="200px"
                    >
                        <Text fontSize={["lg", "lg", "lg", "xl"]}>You're logged in as</Text>
                    </Box>
                </Stack>
            </VStack>
        </Box >
    );
};

export default Profile;
