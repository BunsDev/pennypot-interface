import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const QuestTable = () => {
    // Sample data array
    const questData = [
        { symbol: 'USDC', address: '0x123abc', quest: 'Quest A', rank: 1, status: 'Active' },
        { symbol: 'ETH', address: '0x456def', quest: 'Quest B', rank: 2, status: 'Inactive' },
        { symbol: 'BTC', address: '0x789ghi', quest: 'Quest C', rank: 3, status: 'Active' },
    ];

    return (
        <Table mt={4} variant="simple" colorScheme="gray">
            <Thead>
                <Tr>
                    <Th>Quest</Th>
                    <Th>Address</Th>
                    <Th>Token</Th>
                    <Th>Rank</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {questData.map((quest, index) => (
                    <Tr key={index}>
                        <Td>{quest.quest}</Td>
                        <Td>{quest.address}</Td>
                        <Td>{quest.symbol}</Td>
                        <Td>{quest.rank}</Td>
                        <Td>{quest.status}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default QuestTable;
