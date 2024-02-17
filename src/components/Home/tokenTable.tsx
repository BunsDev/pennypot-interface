import { useEffect, useState } from 'react';
import { useConnect, useEthereum } from '@particle-network/auth-core-modal';
import {
    AddressActivityListView,
    TokenBalancesListView,
    ChainSelector,
    useCovalent
} from "@covalenthq/goldrush-kit";
import { useAppContext } from '@/contexts/globalContext';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';



const TokenTable = () => {
    const { provider, chainInfo } = useEthereum();
    const { user } = useAppContext()
    const { connect, disconnect, connected, } = useConnect();
    const { chains } = useCovalent()
    const [chainName, setChainName] = useState("")
    const router = useRouter()

    useEffect(() => {
        if (chainInfo && chains && user) {
            const x = chains?.filter((x) => Number(x.chain_id) === chainInfo.id)[0]
            console.log("chain info", user.smartWallet)
            setChainName(x.name)
        }
    }, [])

    if (!user) { return }

    return (
        <Box
            fontSize="xs"
            fontFamily={"sans-serif"}
            position={"relative"}
        >
            <Box
            >
                {chainName && (
                    <TokenBalancesListView
                        chain_names={[chainName]}
                        address={user.smartWallet}
                        // hide_small_balances
                        on_transfer_click={(e: any) => {
                            router.push(`/transfers/${e.chain_name}/${e.contract_address}`)
                        }}
                    />
                )}
            </Box>



        </Box>
    );
};

export default TokenTable;
