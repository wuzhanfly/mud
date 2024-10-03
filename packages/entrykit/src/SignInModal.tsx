import { Modal } from "./ui/Modal";
import { useAccount, useConnections, useDisconnect } from "wagmi";
import { useAccountModal } from "./useAccountModal";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/Button";
import { usePasskeyConnector } from "./usePasskeyConnector";

export function SignInModal() {
  const { status } = useAccount();
  console.log("useAccount.status", status);
  const { accountModalOpen, toggleAccountModal } = useAccountModal();
  const { disconnectAsync } = useDisconnect();

  const passkeyConnector = usePasskeyConnector();

  const connections = useConnections();
  const passkeyAddress = connections.find((conn) => conn.connector.type === passkeyConnector.type)?.accounts.at(0);

  return (
    <Modal open={accountModalOpen} onOpenChange={toggleAccountModal}>
      {accountModalOpen ? (
        <div
          className={twMerge(
            "flex flex-col w-[min(100vw,_44rem)] min-h-[28rem] border divide-x",
            "bg-neutral-100 text-neutral-700 border-neutral-300 divide-neutral-300",
            "dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 dark:divide-neutral-700",
            "links:font-medium links:underline links:underline-offset-4",
            "links:text-black dark:links:text-white",
            "links:decoration-neutral-300 dark:links:decoration-neutral-500 hover:links:decoration-orange-500",
          )}
        >
          {passkeyAddress ? (
            <div className="flex-grow flex flex-col items-center justify-center gap-2">
              {passkeyAddress}
              <Button
                onClick={async () => {
                  console.log("disconnecting");
                  await disconnectAsync();
                  console.log("disconnected");
                }}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center gap-2">
              <Button
                onClick={async () => {
                  const address = await passkeyConnector.createPasskey();
                  console.log("created passkey, smart account address:", address);
                }}
              >
                Sign up
              </Button>
              <Button
                onClick={async () => {
                  const address = await passkeyConnector.reusePasskey();
                  console.log("reused passkey, smart account address:", address);
                }}
              >
                Sign in
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </Modal>
  );
}