import { Box, Flex, Text, Link, Button, Container, HStack, Center, VStack, Heading, Divider, Stack, useClipboard, Tooltip } from '@chakra-ui/react';


const Banner = ({ title }: { title: string }) => {

    return (
        <>
            <Box
                bg="#8528c4"
                color="white"
                mt={20}
                h="20vh"
                px={[4, 4, 12]}
            >
                <VStack
                    h="100%"
                    justify="center"
                    align={"flex-start"}
                >
                    <Heading fontWeight="bold">{title}</Heading>
                </VStack>

            </Box>

        </>
    );
};

export default Banner;
