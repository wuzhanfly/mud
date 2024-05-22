import type { CommandModule, InferredOptionTypes } from "yargs";
import { Hex, createWalletClient, http } from "viem";
import { getSystems } from "../deploy/getSystems";
import { getWorldDeploy } from "../deploy/getWorldDeploy";
import { getRpcUrl } from "@latticexyz/common/foundry";
import fs from "node:fs/promises";
import { resourceToLabel } from "@latticexyz/common";
import { functionSignatureToAbiItem } from "../utils/functionSignatureToAbiItem";

const generateAbiOptions = {
  worldAddress: { type: "string", required: true, desc: "Verify an existing World at the given address" },
  profile: { type: "string", desc: "The foundry profile to use" },
  rpc: {
    type: "string",
    desc: "The RPC URL to use. Defaults to the RPC url from the local foundry.toml",
  },
} as const;

type Options = InferredOptionTypes<typeof generateAbiOptions>;

const commandModule: CommandModule<Options, Options> = {
  command: "generate-abi",

  describe: "Generate ABI's for Systems and World based on World address",

  builder(yargs) {
    return yargs.options(generateAbiOptions);
  },

  async handler(args) {
    await generateAbiHandler(args);
    process.exit(0);
  },
};

export async function generateAbiHandler(opts: Options) {
  const worldAddress = opts.worldAddress as Hex;
  const profile = opts.profile ?? process.env.FOUNDRY_PROFILE;
  const rpc = opts.rpc ?? (await getRpcUrl(profile));

  const client = createWalletClient({
    transport: http(rpc),
  });

  const worldDeploy = await getWorldDeploy(client, worldAddress);

  const systems = await getSystems({ client, worldDeploy });

  // render system ABI's
  for (const system of systems) {
    const fullOutputPath = `${resourceToLabel(system)}.abi.json`;
    const abi = system.functions.map((func) => functionSignatureToAbiItem(func.systemFunctionSignature));
    await fs.writeFile(fullOutputPath, JSON.stringify(abi));
  }

  // render World ABI
  const worldAbi = systems.flatMap((system) =>
    system.functions.map((func) => functionSignatureToAbiItem(func.signature)),
  );

  const fullOutputPath = "worldRegisteredFunctions.abi.json";
  await fs.writeFile(fullOutputPath, JSON.stringify(worldAbi));
}

export default commandModule;
