import { useEffect, useMemo } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { http, maxUint256, toHex, publicActions, createClient, ClientConfig } from "viem";
import { callFrom } from "@latticexyz/world/internal";
import { SmartAccountClientConfig, smartAccountActions } from "permissionless";
import { createPimlicoBundlerClient } from "permissionless/clients/pimlico";
import { useConfig } from "./AccountKitProvider";
import { useAppSigner } from "./useAppSigner";
import { useAppAccount } from "./useAppAccount";
import { AppAccountClient, entryPointAddress } from "./common";
import { getUserBalanceSlot } from "./utils/getUserBalanceSlot";
import { getEntryPointDepositSlot } from "./utils/getEntryPointDepositSlot";
import { transportObserver } from "./transportObserver";
import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types/entrypoint";

export function useAppAccountClient(): AppAccountClient | undefined {
  const [appSignerAccount] = useAppSigner();
  const { chain, worldAddress, gasTankAddress } = useConfig();
  const { address: userAddress } = useAccount();
  const publicClient = usePublicClient({ chainId: chain.id });
  const { data: appAccount, error: appAccountError } = useAppAccount({ publicClient, appSignerAccount });

  useEffect(() => {
    if (appAccountError?.message) {
      console.error(
        "Error getting app account. Is the bundler fully deployed and running? If not, you may need to run `pnpm local-bundler`.",
        appAccountError.message,
      );
    }
  }, [appAccountError?.message]);

  // TODO: move this to a query so we can surface app account errors
  return useMemo(() => {
    if (!appSignerAccount) return;
    if (!userAddress) return;
    if (!publicClient) return;
    if (!appAccount) return;

    if (!chain.erc4337BundlerUrl) {
      throw new Error(`No ERC4337 bundler URL found for chain ${chain.name} (id: ${chain.id})`);
    }

    const pimlicoBundlerClient = createPimlicoBundlerClient({
      chain: publicClient.chain,
      transport: transportObserver("pimlico bundler client", http(chain.erc4337BundlerUrl.http)),
      entryPoint: entryPointAddress,
    }).extend(() => publicActions(publicClient));

    const smartAccountClientConfig = {
      key: "Account",
      name: "Smart Account Client",
      type: "smartAccountClient",
      chain: publicClient.chain,
      account: appAccount,
      transport: transportObserver("bundler transport", http(chain.erc4337BundlerUrl.http)),
      middleware: {
        sponsorUserOperation: async ({ userOperation }) => {
          const gasEstimates = await pimlicoBundlerClient.estimateUserOperationGas(
            {
              userOperation: {
                ...userOperation,
                paymaster: gasTankAddress,
                paymasterData: "0x",
              },
            },
            {
              // Pimlico's gas estimation runs with high gas limits, which can make the estimation fail if
              // the cost would exceed the user's balance.
              // We override the user's balance in the paymaster contract and the deposit balance of the
              // paymaster in the entry point contract to make the gas estimation succeed.
              [gasTankAddress]: {
                stateDiff: {
                  [getUserBalanceSlot(userAddress)]: toHex(maxUint256),
                },
              },
              [entryPointAddress]: {
                stateDiff: {
                  [getEntryPointDepositSlot(gasTankAddress)]: toHex(maxUint256),
                },
              },
            },
          );

          return {
            paymasterData: "0x",
            paymaster: gasTankAddress,
            ...gasEstimates,
          };
        },
        gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
      },
    } as const satisfies Omit<SmartAccountClientConfig<ENTRYPOINT_ADDRESS_V07_TYPE>, "bundlerTransport"> &
      Pick<ClientConfig, "type" | "transport">;

    const appAccountClient = createClient(smartAccountClientConfig)
      .extend(
        callFrom({
          worldAddress,
          delegatorAddress: userAddress,
          publicClient,
        }),
      )
      .extend(smartAccountActions({ middleware: smartAccountClientConfig.middleware }))
      // .extend(transactionQueue(publicClient))
      // .extend(writeObserver({ onWrite: (write) => write$.next(write) }))
      .extend(() => publicActions(publicClient));

    return appAccountClient;
  }, [appSignerAccount, userAddress, publicClient, appAccount, worldAddress, gasTankAddress, chain]);
}