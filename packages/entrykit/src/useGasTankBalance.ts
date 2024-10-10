import { useAccount, useBalance } from "wagmi";
import { useEntryKitConfig } from "./EntryKitConfigProvider";
import gasTankConfig from "./gas-tank/mud.config";
import { useRecord } from "./useRecord";
import { usePaymaster } from "./usePaymaster";
import { useAppAccountClient } from "./useAppAccountClient";

export function useGasTankBalance() {
  const { chainId } = useEntryKitConfig();
  const { data: appAccountClient } = useAppAccountClient();
  const appAccountBalance = useBalance(
    appAccountClient && appAccountClient.type !== "smartAccountClient"
      ? {
          chainId,
          address: appAccountClient.account.address,
          query: {
            refetchInterval: 2000,
          },
        }
      : { query: { enabled: false } },
  );

  const gasTank = usePaymaster("gasTank");
  const userAccount = useAccount();
  const userAccountAddress = userAccount.address;

  const gasTankBalance = useRecord(
    appAccountClient?.type === "smartAccountClient" && userAccountAddress && gasTank
      ? {
          chainId,
          address: gasTank.address,
          table: gasTankConfig.tables.UserBalances,
          key: { userAccount: userAccountAddress },
          blockTag: "pending",
          query: {
            refetchInterval: 2000,
          },
        }
      : {},
  );

  return appAccountClient?.type === "smartAccountClient"
    ? {
        ...gasTankBalance,
        gasTankBalance: gasTankBalance.data?.balance,
      }
    : {
        ...appAccountBalance,
        gasTankBalance: appAccountBalance.data?.value,
      };
}
