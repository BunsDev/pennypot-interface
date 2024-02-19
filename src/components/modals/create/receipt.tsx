import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const TxnReceipt = ({ explorerLink }: { explorerLink: string }) => {
    return (
        <Box p={4} bg="green.100" borderRadius="md">
            <Flex align="center">
                <Icon as={FaCheckCircle} boxSize={6} color="green.500" mr={2} />
                <Text fontWeight="bold" color="green.800">
                    Transaction Successful
                </Text>
            </Flex>
            <Text mt={2}>
                Your transaction was successfully processed.{' '}
                <Link href={explorerLink} color="blue.500" isExternal>
                    View on Explorer
                </Link>
            </Text>
        </Box>
    );
};

export default TxnReceipt;
