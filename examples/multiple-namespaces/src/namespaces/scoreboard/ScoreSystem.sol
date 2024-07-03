// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import { System } from "@latticexyz/world/src/System.sol";

import { Position, PositionData } from "../game/codegen/tables/Position.sol";
import { Score } from "./codegen/tables/Score.sol";

int32 constant goalX = 4;
int32 constant goalY = 2;

contract ScoreSystem is System {
  function increaseScore() public {
    address player = _msgSender();

    PositionData memory position = Position.get(player);
    require(position.x == goalX && position.y == goalY, "must be at goal");

    Score.set(player, Score.get(player) + 1);
  }
}
