import { Avatar, Box, Button, Center, Container, Flex, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { GradientButton } from '@/components/Buttons'
import { primaryGradient, primaryBg } from '@/utils/consts';
import { PInput } from '@/components/Inputs';
import { useRouter } from 'next/router';

const InvitePaget: React.FC = () => {
    const router = useRouter();
    return (
        <Box
            height="100vh"
            backgroundColor={primaryBg}
        >
            <Box px={4}>
                <Flex px={3} py={2} align="center" justify="flex-end" mb={4}>

                    <Button
                        bg='white'
                        py={4}
                        px={8}
                    >
                        <Box
                            bgGradient="linear(to-r, blue.400, green.400)"
                            p={2}
                            borderRadius="full"
                            mr={2}
                        >
                            {/* Icon for Pot */}
                            <Text>Icon</Text>
                        </Box>
                        <Text fontSize="xl">User</Text>
                    </Button>

                </Flex>


                <Container
                    maxW="800px"
                    borderRadius="25px"
                    border="2px solid rgba(239, 11, 137, 0.1)"
                    py={12}
                    px={8}
                    position="relative"
                >
                    <Avatar
                        bg="rgba(239, 11, 137, 1)"
                        position="absolute"
                        size={"lg"}
                        top={-5}
                        left={-3}
                    />


                    <Center>
                        <Heading >Quest Invite</Heading>
                    </Center>

                    <VStack mt={12} w='100%' align={"flex-start"}>

                        <Text textAlign={"left"} mb={2}>Pot Address</Text>
                        {/* <Input
                            variant="filled"
                            placeholder="0x...xxx"
                            size="lg"
                            mb={4}
                        /> */}

                        <PInput
                            placeholder="0x...xxx"
                            gradientBorderColor="linear(to-r, blue.400, green.400)"
                            mb={4}
                        />

                        <GradientButton
                            background={primaryGradient}
                        >
                            Join Quest
                        </GradientButton>
                    </VStack>

                </Container>
                <Center mt={8}>
                    <Link
                        href='/'
                        fontSize={"lg"} mt={4} color="gray.500" textAlign="center">
                        Skip to Home
                    </Link>
                </Center>
            </Box>
        </Box >
    );
};

export default InvitePaget;
