import "./polyfills";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { connectorsForWallets, getDefaultWallets, WalletList } from "@rainbow-me/rainbowkit";
import { garnet, redstone } from "@latticexyz/common/chains";
import { anvil } from "viem/chains";
import { passkeyWallet } from "../src/passkey/passkeyWallet";
import { AccountModal } from "../src/AccountModal";
import { EntryKitConfigProvider } from "../src/EntryKitConfigProvider";
import { App } from "./App";
import { Chain, Hex, http } from "viem";
import { Config } from "../src/config";

const testWorlds = {
  [anvil.id]: "0x6Eb9682FE93c6fE4346e0a1e70bC049Aa18CC0CA",
  [garnet.id]: "0x352bd50fc7cbb8a1b3e5f84cf6f4e7d84792acd1",
  [redstone.id]: "0x51778368cd250e4e3800a8fb20c32474c5f1c8cd",
} as Partial<Record<string, Hex>>;

const searchParams = new URLSearchParams(window.location.search);
const chainId = parseInt(searchParams.get("chainId") ?? "") || anvil.id;
const worldAddress = testWorlds[chainId];
if (!worldAddress) {
  throw new Error(`EntryKit playground is not configured with a test world address for chain ID ${chainId}`);
}

const entryKitConfig = {
  chainId,
  worldAddress,
  appInfo: {
    termsOfUse: "#terms",
    privacyPolicy: "#privacy",
  },
  bundlerTransport: http("http://127.0.0.1:4337"),
  paymasterAddress: "0x8D8b6b8414E1e3DcfD4168561b9be6bD3bF6eC4B",
  passIssuerTransport: http("http://127.0.0.1:3003/rpc"),
} as const satisfies Config;

const queryClient = new QueryClient();

const { wallets: defaultWallets } = getDefaultWallets();
const wallets: WalletList = [
  {
    groupName: "Recommended",
    wallets: [
      passkeyWallet({
        chainId,
        bundlerTransport: entryKitConfig.bundlerTransport,
        paymasterAddress: entryKitConfig.paymasterAddress,
      }),
    ],
  },
  ...defaultWallets,
];

const connectors = connectorsForWallets(wallets, {
  appName: "EAT THE FLY",
  projectId: "14ce88fdbc0f9c294e26ec9b4d848e44",
});

const chains = [anvil, redstone, garnet] as [Chain, ...Chain[]];
const transports = Object.fromEntries(chains.map((chain) => [chain.id, http()]));

const wagmiConfig = createConfig({ connectors, chains, transports });

const root = ReactDOM.createRoot(document.querySelector("#react-root")!);
root.render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EntryKitConfigProvider config={entryKitConfig}>
          <App />
          <AccountModal />
        </EntryKitConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);