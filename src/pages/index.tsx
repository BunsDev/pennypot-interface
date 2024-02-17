import { useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useAppContext } from "@/contexts/globalContext";
import SplashScreen from "@/components/Loaders/splashscreen";
import { useConnect } from "@particle-network/auth-core-modal";
import Home from "@/components/Home";


export default function IndexPage() {

  const router = useRouter();
  const { showSplashScreen, setShowSplashScreen } = useAppContext();
  const { connected } = useConnect();

  useEffect(() => {

    const timer = setTimeout(() => {
      if (!connected) {
        console.log("isConnected", connected);
        router.push("intro");

      } else {
        setShowSplashScreen(false);
      }
    }, 3000);
    return () => clearTimeout(timer);

  }, [connected]);




  return (
    <>
      <Head>
        <title>Penny's Pot</title>
        <meta name="description" content="Penny Pot- Save spare change from everyday transactions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="body">
        {showSplashScreen && (
          <Box w="100%" h="100vh">
            <SplashScreen />
          </Box>
        )}

        {!showSplashScreen && (
          <Center minH="100vh">
            <Home />
          </Center>
        )}
      </main>

    </>
  );
}
