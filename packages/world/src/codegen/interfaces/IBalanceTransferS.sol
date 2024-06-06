// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

/**
 * @title IBalanceTransferS
 * @author MUD (https://mud.dev) by Lattice (https://lattice.xyz)
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IBalanceTransferS {
  function transferBalanceToNamespace(ResourceId fromNamespaceId, ResourceId toNamespaceId, uint256 amount) external;

  function transferBalanceToAddress(ResourceId fromNamespaceId, address toAddress, uint256 amount) external;
}
