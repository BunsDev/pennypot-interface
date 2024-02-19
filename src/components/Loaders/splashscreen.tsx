

import AnimatedSpinner from "@/components/AnimatedSpinner";
import { Box, Grid, VStack, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { motion } from "framer-motion";



const SplashScreen = () => {

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeIn", duration: 1 } }}
        >
            <Box
            //  bg="#013b5f"
                zIndex="tooltip"
                w="100%"
                position={"absolute"}
                h="100%"
                bgGradient="linear(to bottom, black, #013b5f)"
                textAlign="center"
                fontSize="xl">

                <VStack h="100%" justifyContent="center" spacing={8}>
                    <Logo h="200px" pointerEvents="none" />
                    <>
                        <Center
                            display={!showSpinner ? "hide" : "flex"}
                            h="100px">
                            {showSpinner && (<AnimatedSpinner />)}
                        </Center>
                    </>
                </VStack>

            </Box>
        </motion.div>
    );
};

export default SplashScreen;