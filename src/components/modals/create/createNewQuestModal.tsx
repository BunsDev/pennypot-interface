import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Select,
    Tag,
    TagCloseButton,
    TagLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Flex,
    Text,
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack,
    Input,
    Center,
    Spinner,
    Divider,
    useToast
} from '@chakra-ui/react';
import { PENNYPOT_ADDRESS, strategies } from '@/utils/consts';
import { useCovalent } from '@covalenthq/goldrush-kit';
import axios from 'axios';
import StrategyInfo from './strategyInfo';
import { useAppContext } from '@/contexts/globalContext';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { AvalancheTestnet } from '@particle-network/chains';
import { useEthereum } from '@particle-network/auth-core-modal';
import pennypotABI from "@/utils/penyypot.json";
import { error } from 'console';
import { title } from 'process';
import TxnReceipt from './receipt';

const CreateNewQuestModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: any }) => {
    const { user, chainName, fetchUsersTokens } = useAppContext()
    const { provider } = useEthereum();
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
    const [whitelistInput, setWhitelistInput] = useState('');
    const [tokens, setTokens] = useState<any | null>(null)
    const [whitelistAddresses, setWhitelistAddresses] = useState<string[]>([]);
    const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);
    const [filteredTokens, setFilteredTokens] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [link, setLink] = useState("");


    const fetchTokens = async () => {
        try {
            const response =
                // await axios.get(`/api/get-user-tokens/?chain=${chainName}&wallet=${user.smartWallet}`);
                await fetchUsersTokens(chainName, user.smartWallet);
            if (response) {
                // console.log("found tokens", response.tokens)
                setTokens(response.tokens.filter((token: any) => token.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"))
                setFilteredTokens(tokens);
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const toast = useToast();

    const handleAddToken = (token: any) => {
        setSelectedTokens([...selectedTokens, token]);
        setTokens(tokens.filter((t: any) => t.address !== token.address));
    };

    const handleRemoveToken = (token: any) => {
        setSelectedTokens(selectedTokens.filter((t) => t !== token));
        setTokens([...tokens, token]);
    };


    const handleAddWhitelistAddress = () => {
        setWhitelistAddresses([...whitelistAddresses, whitelistInput]);
        setWhitelistInput('');
    };

    const handleRemoveWhitelistAddress = (address: string) => {
        setWhitelistAddresses(whitelistAddresses.filter((a) => a !== address));
    };


    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = new Date(event.target.value);
        const today = new Date();
        const timeDiff = selected.getTime() - today.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        // Ensure the minimum date is the next day
        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 1);

        if (selected < minDate) {
            setSelectedDate(minDate);
        } else {
            setSelectedDate(selected);
        }
    };


    const handleCreatOptIn = async () => {
        //create 
        const _contractAddress = PENNYPOT_ADDRESS as string;
        const abi = pennypotABI;
        if (_contractAddress.length < 2) {
            console.log("invalid penny contract address")
        }
        if (selectedStrategy.length < 2) {
            console.log("invalid strategy address")
        }



        setLoading(true);

        const smartAccount = new SmartAccount(provider, {
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
            appId: process.env.NEXT_PUBLIC_APP_ID!,
            aaOptions: {
                simple: [{ chainId: AvalancheTestnet.id, version: '1.0.0' }]
            }
        });

        try {

            const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
            const signer = customProvider.getSigner();
            const contract = new ethers.Contract(_contractAddress, abi, customProvider);

            const methodName = "createQuest";
            const __days = Math.max(1, Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)));
            const daysInSeconds = __days * 24 * 60 * 60;

            const methodParams = [
                ethers.utils.getAddress(selectedStrategy),
                ethers.utils.parseUnits(daysInSeconds.toString(), 0),
                whitelistAddresses,
                selectedTokens.map((x: any) => x.address)
            ];

            // console.log(methodParams)

            const data = contract.interface.encodeFunctionData(methodName, methodParams);
            const tx = {
                to: _contractAddress,
                data: data,
                value: 0,
            };

            const txResponse = await signer.sendTransaction(tx);
            const txReceipt = await txResponse.wait();
            setLink(`https://subnets-test.avax.network/c-chain/tx/${txReceipt.transactionHash}`);
            setLoading(false)
            setSuccess(true)
        } catch (e) {
            console.log(e);
            setLoading(false)
            // toast({
            //     status: "error",
            //     title: "Error",
            //     description: e as string

            // })

        }


    }


    useEffect(() => {
        if (user && !tokens) {
            fetchTokens();
        }
    },);


    // useEffect(() => {
    //     console.log("s", filteredTokens)
    // }, [filteredTokens])




    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent
                zIndex={"tooltip"}
            >
                <ModalHeader>Create New Quest</ModalHeader>
                <ModalBody>

                    {!success && (
                        <Flex>
                            <Box w="100%"
                                maxW="700px"
                            >
                                <FormControl mb={4}>
                                    <FormLabel>Savings Strategy</FormLabel>
                                    <Select
                                        h="50px"
                                        placeholder="Choose a Penny Strategy" onChange={(e) => setSelectedStrategy(e.target.value)}>
                                        {strategies.map((strategy, i) => (
                                            <option key={i} value={strategy.address || ""}
                                                disabled={!strategy.address}
                                            >
                                                {strategy.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>


                                {selectedStrategy.length > 1 && (

                                    <>


                                        <FormControl mb={4}>
                                            <FormLabel>Date Cap</FormLabel>
                                            <Input
                                                h="60px"
                                                type="date"
                                                value={selectedDate.toISOString().split('T')[0]}
                                                onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
                                            <Text
                                                color={"#06b670"}
                                                fontStyle={"italic"}
                                                py={2}
                                                fontWeight={"semibold"}
                                                fontSize={"xs"}
                                            >{Math.max(1, Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)))} days lock period</Text>
                                        </FormControl>


                                        <FormControl mb={4}>
                                            <FormLabel>Whitelisted Token(s)</FormLabel>
                                            <Box>
                                                {selectedTokens.map((token: any) => (
                                                    <Tag key={token.address} m={1}
                                                        variant="solid"
                                                        bg="blue.100"
                                                        h="40px"
                                                        px={2}
                                                        color="blue.500">
                                                        <TagLabel>{token.symbol}</TagLabel>
                                                        <TagCloseButton onClick={() => handleRemoveToken(token)} />
                                                    </Tag>
                                                ))}


                                                <>
                                                    <Menu>
                                                        <MenuButton
                                                            h="55px"
                                                            w="100%"
                                                            border={"1px solid whitesmoke"}
                                                            color="#333"
                                                            pl={5}
                                                            fontSize={"md"}
                                                            as={Tag} m={1} variant="solid" colorScheme="transparent">
                                                            Select Tokens
                                                        </MenuButton>
                                                        <MenuList minH="400px"
                                                            w="100%"
                                                            minW="400px"
                                                            zIndex={"tooltip"}
                                                            color="#333"
                                                            px={5}
                                                        >

                                                            <Input
                                                                py={5}
                                                                type="text"
                                                                w="100%"
                                                                placeholder='Paste Token address'
                                                                isDisabled={true}
                                                            // onChange={handleFilterTokens}
                                                            />

                                                            {!tokens && (
                                                                <MenuItem>
                                                                    <Center h="100%">
                                                                        <Spinner />
                                                                    </Center>
                                                                </MenuItem>
                                                            )}
                                                            <br />
                                                            <br />
                                                            {tokens && tokens.map((token: any) => {
                                                                console.log("tplkee", token.logo)
                                                                return (
                                                                    (
                                                                        <MenuItem key={token.address} onClick={() => handleAddToken(token)}>
                                                                            <Box display="flex" alignItems="center" justifyContent={"space-between"}>
                                                                                <Avatar
                                                                                    h="30px"
                                                                                    w="30px"
                                                                                    src={token.logo || ""}
                                                                                    mr={2} />
                                                                                <VStack fontSize={"sm"} align="start" spacing={0}>
                                                                                    <Text fontWeight={"bold"}>{token.name}</Text>
                                                                                    <Text>{token.symbol}</Text>
                                                                                </VStack>
                                                                            </Box>
                                                                        </MenuItem>
                                                                    ))
                                                            }
                                                            )
                                                            }
                                                        </MenuList>
                                                    </Menu>
                                                </>

                                            </Box>
                                        </FormControl>

                                        <Divider py={3} />

                                        <Button mt={4} onClick={() => setIsAdvancedVisible(!isAdvancedVisible)} mb={4}>
                                            {isAdvancedVisible ? 'Hide Advanced' : 'Show Advanced'}
                                        </Button>

                                        {isAdvancedVisible && (
                                            <FormControl mb={4}>
                                                <FormLabel>Whitelist Addresses</FormLabel>
                                                <Box>
                                                    {whitelistAddresses.map((address) => (
                                                        <Tag key={address} m={1} variant="solid" colorScheme="green">
                                                            <TagLabel>{address}</TagLabel>
                                                            <TagCloseButton onClick={() => handleRemoveWhitelistAddress(address)} />
                                                        </Tag>
                                                    ))}
                                                    <input
                                                        type="text"
                                                        placeholder="Add Whitelist Address"
                                                        value={whitelistInput}
                                                        onChange={(e) => setWhitelistInput(e.target.value)}
                                                    />
                                                    <Button onClick={handleAddWhitelistAddress} ml={2}>
                                                        Add
                                                    </Button>
                                                </Box>
                                            </FormControl>
                                        )}

                                    </>

                                )}

                            </Box>



                            <StrategyInfo />

                        </Flex>
                    )}

                    {success && (
                        <Center>
                            <TxnReceipt explorerLink={link} />
                        </Center>
                    )}

                </ModalBody>


                <ModalFooter>

                    <Button
                        isDisabled={loading}
                        colorScheme="blue" mr={3} onClick={() => {
                            if (success) {
                                setSuccess(false)
                            } else {
                                onClose()
                            }
                        }}>
                        Close
                    </Button>
                    {!success && (
                        <>
                            <Button
                                isLoading={loading}
                                variant="green"
                                onClick={handleCreatOptIn}
                            >Create Quest</Button>
                        </>
                    )}
                </ModalFooter>


            </ModalContent>
        </Modal>
    );
};

export default CreateNewQuestModal;
