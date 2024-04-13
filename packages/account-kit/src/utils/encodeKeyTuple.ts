import { Hex, encodeAbiParameters } from "viem";
import { Schema } from "@latticexyz/config";
import { schemaToPrimitives } from "./schemaToPrimitives";

// TODO: move this to protocol-parser package or similar

export function encodeKeyTuple<keySchema extends Schema, key extends schemaToPrimitives<keySchema>>(
  keySchema: keySchema,
  key: key,
): Hex[] {
  return Object.keys(keySchema).map((name) => encodeAbiParameters([keySchema[name]], [key[name]]));
}