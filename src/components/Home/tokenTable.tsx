import { useEffect } from 'react';
import { useEthereum } from '@particle-network/auth-core-modal';
import {
    TokenBalancesListView,
    useCovalent
} from "@covalenthq/goldrush-kit";
import { useAppContext } from '@/contexts/globalContext';
import { Box } from '@chakra-ui/react';



const TokenTable = () => {
    const { chainInfo } = useEthereum();
    const { user, chainName, setChainName } = useAppContext()
    const { chains } = useCovalent()

    useEffect(() => {
        if (chainInfo && chains && user && chainName.length < 2) {
            const x = chains?.filter((x) => Number(x.chain_id) === chainInfo.id)[0]
            console.log("chain name", x.name)
            setChainName(x.name)
        }
    }, [chainInfo, chains, chainName])

    if (!user) return;

    return (
        <Box
            fontSize="xs"
            fontFamily={"sans-serif"}
            position={"relative"}
        >
            <Box>
                {chainName && (
                    <TokenBalancesListView
                        chain_names={[chainName]}
                        address={user.smartWallet}
                        on_transfer_click={(e: any) => {
                            // router.push(`/transfers/${e.chain_name}/${e.contract_address}`)
                        }}
                    />
                )}
            </Box>

        </Box>
    );
};

export default TokenTable;
