"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { injected, metaMask, safe } from "wagmi/connectors";
import { ReactNode } from "react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { anvil, redstone } from "@wagmi/core/chains";
import { anvil as anvilConnector, defaultAnvilAccounts } from "../../connectors/anvil";
import { AppStoreProvider } from "../../store";

const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [anvil, redstone],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: "World Explorer",
      },
    }),
    safe(),
    // We can't programmatically switch accounts within a connector, but we can switch between connectors,
    // so we'll create one anvil connector per default anvil account so users can switch between default anvil accounts.
    ...defaultAnvilAccounts.map((account, i) =>
      anvilConnector({ id: `anvil-${i}`, name: `Anvil #${i + 1}`, accounts: [account] }),
    ),
  ],
  transports: {
    [anvil.id]: http(),
    [redstone.id]: http(),
  },
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <AppStoreProvider>{children}</AppStoreProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
