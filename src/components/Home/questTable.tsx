
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Select, Spinner, Text, Button, Center, useToast, HStack, useDisclosure, TableCaption, Box } from '@chakra-ui/react';
import pennypotABI from "@/utils/penyypot.json";
import sagelockABI from "@/utils/safeLock.json";
import tokenABI from "@/utils/token.json";
import { CONSUMER_ADDRESS, PENNYPOT_ADDRESS, PotToken, SAFELOCK_ADDRESS, strategies } from '@/utils/consts';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { AvalancheTestnet } from '@particle-network/chains';
import { useEthereum } from '@particle-network/auth-core-modal';
import { ethers } from 'ethers';
import { useAppContext } from '@/contexts/globalContext';
import { shortenAddress } from '@/utils/helpers';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import SavingsPotModal from '../modals/savingsPot';
import AnimatedSpinner from '../AnimatedSpinner';





const QuestTable = () => {
    const { provider } = useEthereum();
    const { user } = useAppContext()
    const [clones, setClones] = useState<string[] | null>(null);
    const [fetchingSavings, setFetchingSavings] = useState(false);
    const [quests, setQuests] = useState<any[] | null>(null)
    const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [selectedQuestToken, setSelectedQuestToken] = useState<any | PotToken>(null)
    const [loading, setLoading] = useState(false);

    const toast = useToast();


    const handleTokenChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newSelectedTokens = [...selectedTokens];
        newSelectedTokens[index] = event.target.value;
        setSelectedTokens(newSelectedTokens);
    };

    const fetchClonesByStrategy = async () => {

        try {
            const contractAddress = PENNYPOT_ADDRESS as string;
            const abi = pennypotABI;
            const strategy = SAFELOCK_ADDRESS;
            if (contractAddress.length < 2) {
                console.log("invalid penny contract address")
            }

            const smartAccount = new SmartAccount(provider, {
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                aaOptions: {
                    simple: [{ chainId: AvalancheTestnet.id, version: '1.0.0' }]
                }
            });
            const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
            const signer = customProvider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const _clones = await contract.getPotsByStrategies(strategy);
            let _quests = [];
            for (let i = 0; i < _clones.length; i++) {
                const clone = _clones[i];
                const potContract = new ethers.Contract(_clones[i], sagelockABI, signer);
                const whitelists = await potContract.getWhitelistedTokens();

                let _tokens = [];
                for (let i = 0; i < whitelists.length; i++) {
                    const addr = whitelists[i];
                    const tokenContract = new ethers.Contract(addr, tokenABI, signer);
                    const symbol = await tokenContract.symbol();
                    const userStatus = await potContract.getTokenDetails(addr, await smartAccount.getAddress())

                    const tokenObj = {
                        address: addr,
                        symbol: symbol,
                        status: userStatus[0],
                        timestamp: Number(userStatus[1]),
                        share: (Number(userStatus[2] / 1e18).toFixed(3)),
                        SN: Number(userStatus[3]),

                    }
                    console.log("user stat", userStatus);
                    _tokens.push(tokenObj)
                }
                const obj = {
                    strategy: strategy,
                    clone: clone,
                    tokens: _tokens
                }
                _quests.push(obj);
            }
            setQuests(_quests as any)
            console.log("total quests", _quests)
            setFetchingSavings(false);
            return _quests;
        } catch (e) {
            console.log("error fetching clones", e);
            setFetchingSavings(false);
        }
    }

    useEffect(() => {
        if (!fetchingSavings && user && !quests) {
            fetchClonesByStrategy();
        }
    }, [fetchingSavings, user, clones]);

    useEffect(() => {
        if (quests) {
            const initialSelectedTokens = quests.map((quest) => quest.tokens[0].address);
            setSelectedTokens(initialSelectedTokens);
        }
    }, [quests]);


    // Function to fetch tokens from the API
    const buildRequest = async (token: string) => {
        try {
            const response = await axios.get(`/api/build-request/?chain=avalanche-testnet&wallet=${user.smartWallet}&token=${token}`);
            return response.data.hash;
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const handleOptIn = async (pot: string, token: string) => {
        console.log(token)        // return
        const _contractAddress = PENNYPOT_ADDRESS as string;
        const abi = pennypotABI;
        setLoading(true);
        try {
            const smartAccount = new SmartAccount(provider, {
                projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
                clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
                appId: process.env.NEXT_PUBLIC_APP_ID!,
                aaOptions: {
                    simple: [{ chainId: AvalancheTestnet.id, version: '1.0.0' }]
                }
            });
            const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
            const signer = customProvider.getSigner();

            const tokenContract = new ethers.Contract(token, tokenABI, signer);

            const methodName = "approve";
            const methodParams = [
                pot,
                ethers.utils.parseEther("10000"),
            ];

            //approval txn
            const data = tokenContract.interface.encodeFunctionData(methodName, methodParams);

            const _request = await buildRequest(token)


            const methodName2 = "optIn";
            const methodParams2 = [
                ethers.utils.getAddress(pot),
                ethers.utils.getAddress(token),
                _request,
                CONSUMER_ADDRESS
            ];

            const contract = new ethers.Contract(_contractAddress, abi, customProvider);

            const data2 = contract.interface.encodeFunctionData(methodName2, methodParams2);

            const tx = {
                tx: [
                    {
                        to: token,
                        data: data,
                        value: 0,
                    },
                    {
                        to: _contractAddress,
                        data: data2,
                        value: 0,
                    },
                ]
            }
            //@ts-ignore
            const txResponse = await smartAccount.sendTransaction(tx);
            console.log(`Opt in transaction Complete. https://subnets-test.avax.network/c-chain/tx/${txResponse}`)
            alert(`Opt in complete. Refresh page`);
            setLoading(false)

        } catch (e: any) {
            setLoading(false)
            console.error("error otpin in clones", e.message);
            alert(e.message);
            // toast({
            //     status: "error",
            //     title: "Error",
            //     description: e.message
            // });
        }
    }



    return (
        <>

            <Table mt={4} fontSize="sm" variant="simple" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Quest</Th>
                        <Th>Address</Th>
                        <Th>Tokens</Th>
                        <Th>Balance</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>


                <Tbody>
                    {quests && quests.length > 0 && quests.map((quest, index) => (
                        <Tr key={index}>
                            <Td>{strategies.find((x) => x.address?.toLowerCase() === quest.strategy?.toLocaleLowerCase())?.name || "UNKNOWN"}</Td>
                            <Td>{shortenAddress(quest.clone)}</Td>
                            <Td>
                                <Select w="100px" value={selectedTokens[index]} onChange={(e) => handleTokenChange(e, index)}>
                                    {quest.tokens.map((token: any) => (
                                        <option key={token.address} value={token.address}>
                                            {token.symbol}
                                        </option>
                                    ))}
                                </Select>
                            </Td>
                            <Td>
                                {quest.tokens.find((token: any) => token.address === selectedTokens[index])?.share!}
                            </Td>

                            <Td>
                                {quest.tokens.find((token: any) => token.address === selectedTokens[index])?.status ? <>
                                    <Button
                                        size={"sm"}
                                        colorScheme='green'
                                        bg="green.500"
                                        fontSize={"xs"}
                                        rightIcon={<FaEye />}
                                        onClick={() => {
                                            const _token = quest.tokens.find((token: any) => token.address === selectedTokens[index]);
                                            const obj = {
                                                ..._token,
                                                quest
                                            }
                                            setSelectedQuestToken(obj);
                                            console.log("checked", obj)
                                            onOpen();
                                        }}
                                    >Active</Button>
                                </>

                                    : (
                                        <Center>
                                            <Button
                                                isLoading={loading}
                                                onClick={() => handleOptIn(quest.clone, selectedTokens[index])}>Opt in</Button>
                                        </Center>
                                    )}
                            </Td>
                        </Tr>
                    ))}


                </Tbody>
            </Table>


            <Box mt={4} display={"flex"} justifyContent={"center"}>
                <Box position={"relative"}
                    h="40px"
                    w="40px"
                >
                    {user && !quests && (
                        <AnimatedSpinner />
                    )}


                    {quests && quests.length < 1 && (
                        <Box>
                            <Text fontSize={"sm"} opacity={0.7}>No Quests Created</Text>
                        </Box>
                    )}
                </Box>

            </Box>

            {selectedQuestToken && (
                <SavingsPotModal isOpen={isOpen} onClose={onClose} savingsPotDetails={selectedQuestToken} />
            )}
        </>
    );
};

export default QuestTable;
