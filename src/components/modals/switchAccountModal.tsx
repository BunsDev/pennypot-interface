import { useEffect, useState } from 'react';
import { Box, Button, HStack, Text, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, List, ListItem, Image, useClipboard, Divider, Flex, Switch } from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";
import { renderAvatar, shortenAddress } from '@/utils/helpers';
import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';
import { useAppContext } from '@/contexts/globalContext';




const SwitchAccountModal = ({ isOpen, onClose }
    : { isOpen: boolean, onClose: any }
) => {
    const { userInfo } = useAuthCore();
    const { connect, disconnect, } = useConnect();
    const { selectedWallet, setSelectedWallet, setShowWallet, showWallet, user, balance, } = useAppContext()
    const [showTooltip2, setShowTooltip2] = useState(false);
    const { onCopy, setValue } = useClipboard(selectedWallet || "");
    const [defaultWallet, setDefaultWallet] = useState<any | string>("")
    const handleSwitchToggle = () => {
        setShowWallet((prevShowWallet) => !prevShowWallet);
    };



    const handleCopy = (value: string) => {
        // alert(value);
        onCopy();
        setShowTooltip2(true);
        setTimeout(() => {
            setShowTooltip2(false);
        }, 2000);
    };


    useEffect(() => {
        if (userInfo && defaultWallet.length < 2) {
            console.log(userInfo);
            setDefaultWallet(userInfo?.wallets.find((wallet) => wallet.chain_name === "evm_chain")!["public_address"] as string);
        }
    }, [userInfo])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={32}
            // h="70vh"         
            >
                <ModalHeader>My Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    <Text pb={2}>Owner</Text>
                    <List spacing={3}>


                        {userInfo && (
                            <ListItem
                                cursor="pointer"
                                onClick={() => {
                                    setSelectedWallet(defaultWallet);

                                }}
                                border="1px solid gray"
                                borderRadius="18px"
                                px={3}
                                py={1.5}
                                bgColor={selectedWallet && selectedWallet === defaultWallet ? '#d9f0f8' : 'transparent'}
                                _hover={{ bgColor: 'gray.100' }}
                            >
                                <HStack
                                    w="100%"
                                    justifyContent={"space-between"}
                                >
                                    <Flex>
                                        <Image src={renderAvatar(defaultWallet)} h="40px" w="40px" rounded="full" />
                                        <Box pl={2} fontSize="sm">
                                            <Text fontWeight="semibold">{shortenAddress(defaultWallet)}</Text>
                                        </Box>
                                    </Flex>
                                </HStack>
                            </ListItem>
                        )}


                        <Divider />



                        {user && (
                            <>

                                <Text>Smart Wallet</Text>


                                <ListItem
                                    cursor="pointer"
                                    onClick={() => {
                                        setSelectedWallet(user.smartWallet || "");

                                    }}
                                    border="1px solid gray"
                                    borderRadius="18px"
                                    px={3}
                                    py={1.5}
                                    bg="#d9f0f8"
                                    _hover={{ bgColor: 'gray.100' }}
                                >
                                    <HStack
                                        w="100%"
                                        justifyContent={"space-between"}
                                    >
                                        <Flex>
                                            <Image src={renderAvatar(user.smartWallet || "")} h="40px" w="40px" rounded="full" />
                                            <Box pl={2} fontSize="sm">
                                                <Text fontWeight="semibold">{shortenAddress(user.smartWallet || "")}</Text>
                                                <Text>{balance} AVAX</Text>
                                            </Box>
                                        </Flex>

                                        <Box>
                                            <Button bg="transparent" onClick={() => handleCopy(user.smartWallet || "")}>
                                                <BiCopy size={24} opacity={0.3} fontWeight="semibold" />
                                            </Button>
                                            {showTooltip2 && selectedWallet && selectedWallet === user.smartWallet && (
                                                <Tooltip label="copied" isOpen={true} placement="top">
                                                    <Box />
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </HStack>
                                </ListItem>



                                <Box display="flex" alignItems="center" pt={4} pb={8}>
                                    <Switch
                                        isChecked={showWallet}
                                        onChange={handleSwitchToggle}
                                        colorScheme="purple"
                                    />
                                    <Box ml={2}>
                                        {showWallet ? "Wallet is VISIBLE" : "Wallet is HIDDEN"}
                                    </Box>
                                </Box>
                            </>
                        )}


                    </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SwitchAccountModal;
