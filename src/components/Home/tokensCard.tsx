import { primaryGradient } from '@/utils/consts';
import { Box, Container, VStack } from '@chakra-ui/react';
import { useAppContext } from '@/contexts/globalContext';
import TokenTable from './tokenTable';


const TokensCard = () => {
    const { user} = useAppContext()

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



