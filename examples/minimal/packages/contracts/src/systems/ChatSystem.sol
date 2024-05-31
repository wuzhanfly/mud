// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import { System } from "@latticexyz/world/src/System.sol";
import { MessageTable } from "../codegen/tables/MessageTable.sol";

contract ChatSystem is System {
  function sendMessage(string memory message) public {
    MessageTable.set(message);
  }
}
