// pages/intro.tsx

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import { GradientButton } from '@/components/Buttons/';
import { primaryBg, primaryGradient } from '@/utils/consts';

const IntroPage: React.FC = () => {
    const [currentScene, setCurrentScene] = useState(1);


    // Handle transition to next scene
    const handleNextScene = () => {
        setCurrentScene(currentScene + 1);
    };

    return (
        <Box
            height="100vh"
            backgroundColor={primaryBg}
        >
            <Center height="100%">
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
                        <Text fontSize="4xl" fontWeight="bold" mb="4">
                            Placeholder 1
                        </Text>
                        <Text fontSize="xl" mb="8">
                            Welcome to Penny's Pot!
                        </Text>
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
                        <Text fontSize="xl" mb="8">
                            Savings is as easy as pie...
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
                        <Text fontSize="xl" mb="8">
                            Grab your pals
                        </Text>
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
                        <Text fontSize="xl" mb="8">
                            And chase quests together!
                        </Text>
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
                    <Box textAlign="center">
                        <Text fontSize="xl" mb="8">
                            Let's go  fabulous!
                        </Text>
                        <GradientButton
                            background={primaryGradient}
                            onClick={() => console.log('Button clicked!')}
                        >
                            Sign In
                        </GradientButton>

                    </Box>
                </motion.div>
            </Center>
        </Box>
    );
};

export default IntroPage;
