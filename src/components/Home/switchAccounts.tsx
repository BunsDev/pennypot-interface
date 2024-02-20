
import { Button, Menu, MenuButton, MenuList, MenuDivider, Box, Center } from "@chakra-ui/react";
import { useConnect } from '@particle-network/auth-core-modal';
import { useRouter } from "next/router";
import { FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";

const AccountSwitcher = () => {
    const { disconnect, } = useConnect();
    const router = useRouter()

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
                    onClick={() => {
                        disconnect();
                        localStorage.clear();
                        router.push("/intro")
                    }}
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
