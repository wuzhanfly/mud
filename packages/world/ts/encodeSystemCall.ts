import { Abi, EncodeFunctionDataParameters, Hex, encodeFunctionData, type ContractFunctionName } from "viem";
import type { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from "abitype";
import { abi as IWorldCallAbi } from "./abi/IWorldCall";

export type SystemCall<abi extends Abi, functionName extends ContractFunctionName<abi>> = EncodeFunctionDataParameters<
  abi,
  functionName
> & {
  readonly systemId: Hex;
};

/** Encode a system call to be passed as arguments into `World.call` */
export function encodeSystemCall<abi extends Abi, functionName extends ContractFunctionName<abi>>({
  abi,
  systemId,
  functionName,
  args,
}: SystemCall<abi, functionName>): AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof IWorldCallAbi, "call">["inputs"]
> {
  return [
    systemId,
    encodeFunctionData<abi, functionName>({
      abi,
      functionName,
      args,
    } as unknown as EncodeFunctionDataParameters<abi, functionName>),
  ];
}
