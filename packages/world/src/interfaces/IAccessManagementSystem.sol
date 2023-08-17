// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface IAccessManagementSystem {
  function grantAccess(bytes32 resourceSelector, address grantee) external;

  function revokeAccess(bytes32 resourceSelector, address grantee) external;
}
