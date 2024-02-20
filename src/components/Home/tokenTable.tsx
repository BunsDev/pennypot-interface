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
import { COVALENT_API_KEY } from '@/utils/consts';



const TokenTable = () => {
    const { provider, chainInfo } = useEthereum();
    const { user, chainName, setChainName } = useAppContext()
    const { connect, disconnect, connected, } = useConnect();
    const { chains } = useCovalent()
    const router = useRouter()

    useEffect(() => {
        if (chainInfo && chains && user && chainName.length < 2) {
            const x = chains?.filter((x) => Number(x.chain_id) === chainInfo.id)[0]
            console.log("chain name", x.name)
            setChainName(x.name)
            // const sampleToken = '0x88233eEc48594421FA925D614b3a94A2dDC19a08'
            // const c = ` https://api.covalenthq.com/v1/${x.name}/address/${user.smartWallet}/balances_v2/?key=${COVALENT_API_KEY}`

        }
    }, [chainInfo, chains, chainName])

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
