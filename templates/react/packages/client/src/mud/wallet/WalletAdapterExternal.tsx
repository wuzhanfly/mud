import { useMemo, type ReactNode } from "react";
import { WagmiProvider, createConfig, useAccount, useWalletClient } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { WalletClient, Transport, Chain, Account } from "viem";
import { BurnerProvider } from "./BurnerContext";
import { useNetwork } from "../NetworkContext";
import { ExternalConnector } from "./ExternalConnector";
import { isDelegated, delegateToBurner } from "./delegation";
import { createBurner, type Burner } from "./createBurner";
import { callFrom } from "./callFrom";

export function WalletAdapterExternal(props: { children: ReactNode }) {
  const { publicClient } = useNetwork();

  const [wagmiConfig, queryClient] = useMemo(
    () => [
      createConfig({
        chains: [publicClient.chain],
        client: () => publicClient,
      }),
      new QueryClient(),
    ],
    [publicClient],
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ExternalConnector />
        <Connection>{props.children}</Connection>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function Connection(props: { children: ReactNode }) {
  const network = useNetwork();
  const { data: externalWalletClient } = useWalletClient();
  const { chainId } = useAccount();

  if (externalWalletClient && chainId === network.publicClient.chain.id) {
    return <Delegation externalWalletClient={externalWalletClient}>{props.children}</Delegation>;
  }

  return <div>{props.children}</div>;
}

function Delegation(props: { externalWalletClient: WalletClient<Transport, Chain, Account>; children: ReactNode }) {
  const network = useNetwork();

  const burner = useMemo(() => createBurner(network), [network]);

  const delegation = network.useStore((state) =>
    state.getValue(network.tables.UserDelegationControl, {
      delegator: props.externalWalletClient.account.address,
      delegatee: burner.walletClient.account.address,
    }),
  );

  if (delegation && isDelegated(delegation.delegationControlId)) {
    return (
      <Content externalWalletClient={props.externalWalletClient} burner={burner}>
        {props.children}
      </Content>
    );
  }

  return (
    <div>
      <button onClick={() => delegateToBurner(network, props.externalWalletClient, burner.walletClient)}>
        Set up burner wallet account
      </button>
      <div>{props.children}</div>
    </div>
  );
}

function Content(props: {
  externalWalletClient: WalletClient<Transport, Chain, Account>;
  burner: Burner;
  children: ReactNode;
}) {
  const network = useNetwork();

  const burner = useMemo(() => {
    const walletClient = props.burner.walletClient.extend(
      callFrom({
        worldAddress: network.worldAddress,
        delegatorAddress: props.externalWalletClient.account.address,
        worldFunctionToSystemFunction: async (worldFunctionSelector) => {
          const systemFunction = network.useStore
            .getState()
            .getValue(network.tables.FunctionSelectors, { worldFunctionSelector })!;
          return { systemId: systemFunction.systemId, systemFunctionSelector: systemFunction.systemFunctionSelector };
        },
      }),
    );
    return { ...props.burner, walletClient };
  }, [props.burner, props.externalWalletClient.account.address, network]);

  return (
    <div>
      <div>Burner wallet account: {burner.walletClient.account.address}</div>
      <BurnerProvider burner={burner}>{props.children}</BurnerProvider>
    </div>
  );
}
