import { Hex, encodeFunctionData } from "viem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAction } from "viem/utils";
import { sendUserOperation, waitForUserOperationReceipt } from "viem/account-abstraction";
import { useEntryKitConfig } from "../EntryKitConfigProvider";
import { ConnectedClient, unlimitedDelegationControlId, worldAbi } from "../common";
import { paymasterAbi } from "../paymaster";
import { waitForTransactionReceipt } from "viem/actions";
import { defineCall } from "../utils/defineCall";
import { useClient } from "wagmi";
import { resourceToHex } from "@latticexyz/common";
import IBaseWorldAbi from "@latticexyz/world/out/IBaseWorld.sol/IBaseWorld.abi.json";
import { callWithSignature } from "../utils/callWithSignature";

export function useSetupSession({ userClient }: { userClient: ConnectedClient }) {
  const queryClient = useQueryClient();
  const { chainId, worldAddress, paymasterAddress } = useEntryKitConfig();
  const client = useClient({ chainId });

  const mutationKey = ["setupSession", client?.chain.id, userClient.account.address];
  return useMutation({
    mutationKey,
    onError: (error) => console.error(error),
    mutationFn: async ({
      sessionClient,
      registerSpender,
      registerDelegation,
    }: {
      sessionClient: ConnectedClient;
      registerSpender: boolean;
      registerDelegation: boolean;
    }): Promise<void> => {
      if (!client) throw new Error("Client not ready.");
      const sessionAddress = sessionClient.account.address;

      console.log("setting up session");

      if (userClient.account.type !== "smart") {
        const txs: Hex[] = [];

        if (registerSpender) {
          console.log("registering spender");
          const tx = await callWithSignature({
            client,
            userClient,
            sessionClient,
            worldAddress: paymasterAddress,
            systemId: resourceToHex({ type: "system", namespace: "", name: "SpenderSystem" }),
            callData: encodeFunctionData({
              abi: paymasterAbi,
              functionName: "registerSpender",
              args: [sessionAddress],
            }),
          });
          console.log("got spender tx", tx);
          txs.push(tx);
        }

        if (registerDelegation) {
          console.log("registering delegation");
          const tx = await callWithSignature({
            client,
            userClient,
            sessionClient,
            worldAddress,
            systemId: resourceToHex({ type: "system", namespace: "", name: "Registration" }),
            callData: encodeFunctionData({
              abi: IBaseWorldAbi,
              functionName: "registerDelegation",
              args: [sessionAddress, unlimitedDelegationControlId, "0x"],
            }),
          });
          console.log("got delegation tx", tx);
          txs.push(tx);
        }

        if (!txs.length) return;

        console.log("waiting for", txs.length, "receipts");
        for (const hash of txs) {
          const receipt = await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({ hash });
          console.log("got tx receipt", receipt);
          if (receipt.status === "reverted") {
            console.error("tx reverted?", receipt);
          }
        }
      } else {
        const calls = [];

        if (registerSpender) {
          console.log("registering spender");
          calls.push(
            defineCall({
              to: paymasterAddress,
              abi: paymasterAbi,
              functionName: "registerSpender",
              args: [sessionAddress],
            }),
          );
        }

        if (registerDelegation) {
          console.log("registering delegation");
          calls.push(
            defineCall({
              to: worldAddress,
              abi: worldAbi,
              functionName: "registerDelegation",
              args: [sessionAddress, unlimitedDelegationControlId, "0x"],
            }),
          );
        }

        if (!calls.length) return;

        console.log("setting up account with", calls, userClient);
        const hash = await getAction(userClient, sendUserOperation, "sendUserOperation")({ calls });
        console.log("got user op hash", hash);

        const receipt = await getAction(
          userClient,
          waitForUserOperationReceipt,
          "waitForUserOperationReceipt",
        )({ hash });
        console.log("got user op receipt", receipt);

        if (!receipt.success) {
          console.error("not successful?", receipt);
        }
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["getSpender"] }),
        queryClient.invalidateQueries({ queryKey: ["getDelegation"] }),
        queryClient.invalidateQueries({ queryKey: ["getPrerequisites"] }),
      ]);
    },
    retry: 0,
  });
}
