// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

import { ResourceId } from "./../../WorldResourceId.sol";

/**
 * @title IAccessManagement
 * @author MUD (https://mud.dev) by Lattice (https://lattice.xyz)
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IAccessManagement {
  function grantAccess(ResourceId resourceId, address grantee) external;

  function revokeAccess(ResourceId resourceId, address grantee) external;

  function transferOwnership(ResourceId namespaceId, address newOwner) external;

  function renounceOwnership(ResourceId namespaceId) external;
}
