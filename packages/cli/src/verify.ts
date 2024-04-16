import { forge, getRpcUrl } from "@latticexyz/common/foundry";
import { Hex, createWalletClient, getCreate2Address, http } from "viem";
import { salt } from "./deploy/common";
import { ensureDeployer } from "./deploy/ensureDeployer";
import { privateKeyToAccount } from "viem/accounts";
import { MUDError } from "@latticexyz/common/errors";
import accessManagementSystemBuild from "@latticexyz/world/out/AccessManagementSystem.sol/AccessManagementSystem.json" assert { type: "json" };
import balanceTransferSystemBuild from "@latticexyz/world/out/BalanceTransferSystem.sol/BalanceTransferSystem.json" assert { type: "json" };
import batchCallSystemBuild from "@latticexyz/world/out/BatchCallSystem.sol/BatchCallSystem.json" assert { type: "json" };
import registrationSystemBuild from "@latticexyz/world/out/RegistrationSystem.sol/RegistrationSystem.json" assert { type: "json" };
import initModuleBuild from "@latticexyz/world/out/InitModule.sol/InitModule.json" assert { type: "json" };
import worldFactoryBuild from "@latticexyz/world/out/WorldFactory.sol/WorldFactory.json" assert { type: "json" };

type VerifyOptions = {
  foundryProfile?: string;
  systems: { name: string; bytecode: Hex }[];
  modules: { name: string; bytecode: Hex }[];
};

// The contracts that are deployed in ensureWorldFactory
const WORLD_FACTORY = [
  { name: "AccessManagementSystem", bytecode: accessManagementSystemBuild.bytecode.object as Hex },
  { name: "BalanceTransferSystem", bytecode: balanceTransferSystemBuild.bytecode.object as Hex },
  { name: "BatchCallSystem", bytecode: batchCallSystemBuild.bytecode.object as Hex },
  { name: "RegistrationSystem", bytecode: registrationSystemBuild.bytecode.object as Hex },
  { name: "InitModule", bytecode: initModuleBuild.bytecode.object as Hex },
  { name: "WorldFactory", bytecode: worldFactoryBuild.bytecode.object as Hex },
];

async function verifyContract(foundryProfile: string | undefined, deployerAddress: Hex, name: string, bytecode: Hex) {
  const system = getCreate2Address({ from: deployerAddress, bytecode, salt });

  await forge(["verify-contract", system, name, "--verifier", "sourcify"], {
    profile: foundryProfile,
  });
}

async function verifyContractWorld(
  foundryProfile: string | undefined,
  deployerAddress: Hex,
  name: string,
  bytecode: Hex,
) {
  const system = getCreate2Address({ from: deployerAddress, bytecode, salt });

  await forge(["verify-contract", system, name, "--verifier", "sourcify"], {
    profile: foundryProfile,
    cwd: "node_modules/@latticexyz/world",
  });
}

export async function verify({
  foundryProfile = process.env.FOUNDRY_PROFILE,
  systems,
  modules,
}: VerifyOptions): Promise<void> {
  const privateKey = process.env.PRIVATE_KEY as Hex;
  if (!privateKey) {
    throw new MUDError(
      `Missing PRIVATE_KEY environment variable.
Run 'echo "PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" > .env'
in your contracts directory to use the default anvil private key.`,
    );
  }

  const rpc = await getRpcUrl(foundryProfile);

  const client = createWalletClient({
    transport: http(rpc),
    account: privateKeyToAccount(privateKey),
  });

  const deployerAddress = await ensureDeployer(client);

  await Promise.all(
    systems.map(({ name, bytecode }) => verifyContract(foundryProfile, deployerAddress, name, bytecode)),
  );

  // TODO: fetch these from world
  await Promise.all(
    WORLD_FACTORY.map(({ name, bytecode }) => verifyContractWorld(foundryProfile, deployerAddress, name, bytecode)),
  );
  // TODO: fetch these from world-modules
  await Promise.all(
    modules.map(({ name, bytecode }) => verifyContract(foundryProfile, deployerAddress, name, bytecode)),
  );
}
