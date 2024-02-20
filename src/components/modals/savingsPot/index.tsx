import { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    HStack,
    Center,
    VStack,
    Divider
} from '@chakra-ui/react';
import { PotToken } from '@/utils/consts';
import tokenABI from "@/utils/token.json";
import { ethers } from 'ethers';
import { useAppContext } from '@/contexts/globalContext';
import { BiCopy } from 'react-icons/bi';

const SavingsPotModal = ({ isOpen, onClose, savingsPotDetails }: { isOpen: boolean, onClose: () => void, savingsPotDetails: PotToken | any }) => {
    const [increasingCap, setIncreasingCap] = useState(false);
    const { user } = useAppContext()
    const [invitingFriends, setInvitingFriends] = useState(false);
    const [fetching, setFetching] = useState(true)
    const [total, setTotal] = useState(0);
    const [cap, setCap] = useState(0);
    const unlockDate = new Date(Number(savingsPotDetails.timestamp) * 1000); // Ensure timestamp is in milliseconds
    const [lastToken, setLastToken] = useState("");
    const formattedUnlockDate = unlockDate.toLocaleDateString('en-US', {
        day: "numeric",
        month: 'long',
        year: 'numeric'
    });

    const handleIncreaseCap = () => {
        setIncreasingCap(true);
    };

    const handleInviteFriends = () => {
        setInvitingFriends(true);
    };


    const getTotalSupply = async () => {
        console.log(savingsPotDetails);
        if (!savingsPotDetails) {
            return
        }
        const rpcUrl = "https://api.avax-test.network/ext/C/rpc";
        const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        const tokenContract = new ethers.Contract(savingsPotDetails.address, tokenABI, provider);
        const _total = await tokenContract.balanceOf(savingsPotDetails.quest.clone);
        setTotal(parseFloat((Number(_total / 1e18).toFixed(3))));
        const allowance = await tokenContract.allowance(user.smartWallet, savingsPotDetails.quest.clone);
        console.log("normal allowance", Number(allowance));
        setCap(parseFloat((Number(allowance / 1e18).toFixed(3))));
        setLastToken(savingsPotDetails.address)
        setFetching(false);
    }

    useEffect(() => {
        if (savingsPotDetails && fetching) {
            getTotalSupply();
        }
    }, [fetching, savingsPotDetails.address])


    useEffect(() => {
        if (savingsPotDetails && lastToken !== savingsPotDetails.address) {
            setFetching(true)
        }
    }, [lastToken, savingsPotDetails.address])





    return (
        <Modal isOpen={isOpen} onClose={onClose}

        >
            <ModalOverlay />
            <ModalContent mt={32}>
                <ModalHeader>Savings Pot</ModalHeader>
                <ModalCloseButton />
                <ModalBody

                >
                    <Box fontSize={"sm"}>
                        <VStack>
                            <Box display={"flex"} flexDir={"column"} justifyContent={"center"} >
                                <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>{total}</Text>
                                <Text textAlign={"center"}>Total Supply <b>{savingsPotDetails.totalSupply}</b></Text>
                            </Box>

                            <Text textAlign={"left"}>My Share:  <b>{savingsPotDetails.share}</b></Text>
                        </VStack>

                        <Divider pt={4} mb={4} />
                        <HStack
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            pb={8}>
                            <Text>Remittance Cap: <span style={{
                                fontWeight: "bold"
                            }}>
                                {cap}
                            </span></Text>
                            <Button
                                size="sm"
                                colorScheme="gray"
                                mr={3}
                                onClick={handleIncreaseCap}
                            >
                                {increasingCap ? 'Increasing...' : 'Increase Cap'}
                            </Button>

                        </HStack>

                        <HStack
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            pb={8}>
                            <Text>Unlock Date:

                                <span style={{
                                    paddingLeft: "5px",
                                    fontWeight: "bold",
                                    color: "green"
                                }}>
                                    {formattedUnlockDate}
                                </span>
                            </Text>
                            <Button
                                size="sm"
                                colorScheme="red"
                                mr={3}
                                onClick={handleIncreaseCap}
                                isDisabled={true}
                            >
                                Withdraw
                            </Button>
                        </HStack>





                    </Box>
                </ModalBody>
                <ModalFooter>
                    <HStack
                        justifyContent={"space-between"}
                    >
                        <Box color={"blue.500"} maxW={"60%"}>
                            <Text>Invite friends to join your Savings Quest</Text>
                        </Box>
                        <Button
                            size={"sm"}
                            colorScheme="blue"
                            onClick={handleInviteFriends}
                            leftIcon={<BiCopy />}
                        >
                            Copy Address
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SavingsPotModal;
