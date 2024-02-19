import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
} from '@chakra-ui/react';

const StrategyInfo = () => {


    return (
        <Box
            w="100%"
            display={["none", "none", "none", "flex"]}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            fontStyle={"italic"}
            position={"relative"}
            h="70vh"
        >
            <Box
                h="300px"
                w="300px"
                rounded={"full"}
                bg="purple.50"
                position={"absolute"}
                zIndex={"-1"}
            />
            <Text
                fontWeight={"bold"}
                fontSize={"2xl"}
            >Penny's Savings Quest </Text>

            <Text
                mt={2}
                fontWeight={"semibold"}
                fontSize={"xl"}
                maxW="300px"
                opacity={"0.8"}
            >
                A new Quest is a savings contract that implements
                one of many savings strategies on Pennys.
            </Text>



        </Box>
    );
};

export default StrategyInfo;
