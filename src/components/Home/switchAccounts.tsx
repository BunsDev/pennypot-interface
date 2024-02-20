
import { Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Text, VStack, Box, Center } from "@chakra-ui/react";
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect } from "react";
import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";

const AccountSwitcher = () => {
    const { connect, disconnect, connected, } = useConnect();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<FaExchangeAlt color='purple' />}>
                Actions
            </MenuButton>
            <MenuList>
                {/* <MenuItem>New Quest</MenuItem>
                <MenuItem>Join Quest</MenuItem>
                <MenuItem>Edit Profile</MenuItem> */}
                <MenuDivider />


                <Box pt={4} px={1} color="red.500" display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                    as="button"
                    onClick={disconnect}
                >
                    <FaSignOutAlt />
                    <Center>
                        <Box ml={2}>
                            Logout
                        </Box>
                    </Center>
                </Box>
            </MenuList>
        </Menu>
    );
};

export default AccountSwitcher;
