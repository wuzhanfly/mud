// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import { System } from "@latticexyz/world/src/System.sol";
import { Position } from "../codegen/game/tables/Position.sol";

contract game__MoveSystem is System {
  function move(int32 x, int32 y) public {
    address player = _msgSender();
    Position.set(player, x, y);
  }
}
