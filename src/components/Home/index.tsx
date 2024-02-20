import { Box, VStack } from '@chakra-ui/react';
import { useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect, useState } from 'react';
import NavBar from './navbar';
import ActiveCard from './activeCard';

const Home: React.FC = () => {
    const { userInfo } = useAuthCore();
    const [user, setUser] = useState<any | null>(null);


    useEffect(() => {
        if (userInfo) {
            const obj = {
                avatar: userInfo.avatar,
                name: userInfo.name,
                email: userInfo.thirdparty_user_info?.user_info.email
            }
            setUser(obj)
        }
    }, [userInfo])





    return (
        <Box w="100%">
            <NavBar />
            <VStack py={8}>
                <ActiveCard />
            </VStack>
        </Box >
    );
};

export default Home;



