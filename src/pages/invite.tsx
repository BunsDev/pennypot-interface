import { Avatar, Box, Button, Center, Container, Flex, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { GradientButton } from '@/components/Buttons'
import { primaryGradient, primaryBg } from '@/utils/consts';
import { PInput } from '@/components/Inputs';
import { useRouter } from 'next/router';

const InvitePage: React.FC = () => {
    const router = useRouter();
    return (
        <Box
            height="100vh"
            backgroundColor={primaryBg}
        >
            <VStack
                h="100%"
                justifyContent={"center"}
                px={4}>



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

                    <Text my={8} textAlign={"left"} mb={2}>Pot Address or IPFS hash</Text>

                    <VStack w='100%' align={"center"}>

                        <PInput
                            borderRadius={["25px", "25px", "25px", "50px"]}
                            placeholder="0x...xxx"
                            gradientBorderColor="linear(to-r, blue.400, green.400)"
                            mb={4}
                        />

                        <GradientButton
                            background={primaryGradient}
                        >
                            Join
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
            </VStack>
        </Box >
    );
};

export default InvitePage;
