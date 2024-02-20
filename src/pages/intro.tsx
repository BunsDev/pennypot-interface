// pages/intro.tsx

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Box, Button, Center, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaChevronDown } from "react-icons/fa";
import { useEthereum, useConnect, useAuthCore, } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { GradientButton } from '@/components/Buttons/';
import { blackGradient, primaryBg, primaryGradient } from '@/utils/consts';
import { useRouter } from 'next/router';
import AnimatedSpinner from '@/components/AnimatedSpinner';




const IntroPage: React.FC = () => {
    const { provider } = useEthereum();
    const { userInfo, } = useAuthCore();
    const { connect, disconnect, connected } = useConnect();
    const [currentScene, setCurrentScene] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleNextScene = () => {
        setCurrentScene(currentScene + 1);
    };


    const handleLogin = async (authType: any) => {
        setLoading(true)
        if (!userInfo) {
            await connect({
                socialType: authType,
                chain: AvalancheTestnet,
            });
        }
    };


    useEffect(() => {
        if (connected) {
            setLoading(true)
            if (!userInfo) {
                setLoading(true)
            } else {
                setLoading(false)
                router.push("/");
            }
        }
    }, [connected, userInfo])


    return (
        <Box
            height="100vh"
            backgroundColor={primaryBg}
        >
            {loading && (
                <Center h="100vh">
                    <AnimatedSpinner />
                </Center>
            )}
            {!loading && (
                <Center h="100vh">
                    {/* Scene 1: Penny appears from the left side with a cheerful wave */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 1 }}
                        style={{ display: currentScene === 1 ? 'block' : 'none' }}
                        onAnimationComplete={() => {
                            setTimeout(handleNextScene, 3000);
                        }}
                    >
                        <Box textAlign="center">

                            <Box
                                as="img"
                                src="/welcome.png"

                            />
                            <Text
                                bgGradient="linear(to-l, #7928CA, #006699)"
                                bgClip='text'
                                fontSize="5xl" fontWeight="bold" mb="4">
                                Welcome to a new Era of Saving!
                            </Text>
                            {/* <Text fontSize="xl" mb="8">
                                Welcome to Penny's Pot!
                            </Text> */}
                        </Box>
                    </motion.div>

                    {/* Scene 2: Coins rain down into Penny's pot */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 1, delay: 4 }}
                        animate={{ opacity: 1, y: 0, }}
                        style={{ display: currentScene === 2 ? 'block' : 'none' }}
                        onAnimationComplete={() => {
                            setTimeout(handleNextScene, 2000);
                        }}
                    >
                        <Box textAlign="center">
                            <Box
                                as="img"
                                src="/pie.png"

                            />
                            <Text fontSize="4xl" color="#006699" fontWeight="bold" mb="4">
                                It's as easy as eating this pie  <span
                                    style={{
                                        fontSize: "64px"
                                    }}
                                >

                                    🥧
                                </span>
                            </Text>
                        </Box>
                    </motion.div>

                    {/* Scene 3: Users tap happily on their phones as coins fly around them */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        exit={{ opacity: 0, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 7 }}
                        style={{ display: currentScene === 3 ? 'block' : 'none' }}
                        onAnimationComplete={() => {
                            setTimeout(handleNextScene, 2000);
                        }}
                    >
                        <Box textAlign="center">

                            <Text fontSize="4xl" fontWeight="bold" mb="4">
                                Grab your frens

                                <span
                                    style={{
                                        fontSize: "64px"
                                    }}
                                >
                                    👩‍👧‍👦
                                </span>
                            </Text>
                            <Box
                                as="img"
                                src="/grab.png"

                            />

                        </Box>
                    </motion.div>

                    {/* Scene 4: Penny winks mischievously */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 10 }}
                        style={{ display: currentScene === 4 ? 'block' : 'none' }}
                        onAnimationComplete={() => {
                            setTimeout(handleNextScene, 2000);
                        }}
                    >
                        <Box textAlign="center">
                            <Box fontSize="4xl" fontWeight="bold" mb="4">
                                And complete quests together
                                <span
                                    style={{
                                        fontSize: "64px"
                                    }}
                                >
                                    💎📦💰

                                    <Box
                                        as="img"
                                        src="/complete.png"

                                    />

                                </span>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Scene 5: Penny giggles and waves goodbye */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 13 }}
                        style={{ display: currentScene === 5 ? 'block' : 'none' }}
                    >
                        <Box textAlign="center" position={"relative"}>

                            <Box
                                ml={64}
                                position={"absolute"}
                                as="img"
                                src="/go.png"
                            />
                            <Text
                                bgGradient="linear(to-l, #7928CA, #006699)"
                                fontWeight={"bold"}
                                bgClip='text'
                                fontSize="xl" mb="8">
                                Let's go fabulous
                                <span
                                    style={{
                                        fontSize: "64px",
                                        visibility: "hidden"
                                    }}
                                >
                                    💪
                                </span>
                            </Text>
                            <VStack>
                                <GradientButton
                                    background={[]}
                                    bg="#333"
                                    leftIcon={<Box as="img" h="40px" w="40px" src='/google.png' alt='ggle' />}
                                    onClick={() => handleLogin('google')}
                                >
                                    Sign In with Google
                                </GradientButton>

                                <GradientButton
                                    mt={2}
                                    background={blackGradient}
                                    leftIcon={<Box as="img" h="40px" w="40px" src='/x.png' alt='x' />}
                                    onClick={() => handleLogin('twitter')}
                                >
                                    Sign In with X
                                </GradientButton>
                                {/* <GradientButton
                               background={primaryGradient}
                               onClick={() => console.log('Button clicked!')}
                           >
                               More Options
                           </GradientButton> */}

                                <IconButton mt={0}
                                    bg="transparent"
                                    onClick={() => handleLogin('')}
                                    aria-label='more'
                                    icon={<FaChevronDown
                                        fontSize={"32px"}
                                        fontWeight={"bold"}
                                        style={{
                                            background: "linear(to-b, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
                                        }}
                                    />

                                    }

                                />

                            </VStack>
                        </Box>
                    </motion.div>
                </Center>
            )}
        </Box>
    );
};

export default IntroPage;
