// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

// Import user types
import { Enum1, Enum2 } from "./../Types.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("Statics")));
bytes32 constant StaticsTableId = _tableId;

struct StaticsData {
  uint256 v1;
  int32 v2;
  bytes16 v3;
  address v4;
  bool v5;
  Enum1 v6;
  Enum2 v7;
}

library Statics {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](7);
    _schema[0] = SchemaType.UINT256;
    _schema[1] = SchemaType.INT32;
    _schema[2] = SchemaType.BYTES16;
    _schema[3] = SchemaType.ADDRESS;
    _schema[4] = SchemaType.BOOL;
    _schema[5] = SchemaType.UINT8;
    _schema[6] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](7);
    _schema[0] = SchemaType.UINT256;
    _schema[1] = SchemaType.INT32;
    _schema[2] = SchemaType.BYTES16;
    _schema[3] = SchemaType.ADDRESS;
    _schema[4] = SchemaType.BOOL;
    _schema[5] = SchemaType.UINT8;
    _schema[6] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](7);
    _fieldNames[0] = "v1";
    _fieldNames[1] = "v2";
    _fieldNames[2] = "v3";
    _fieldNames[3] = "v4";
    _fieldNames[4] = "v5";
    _fieldNames[5] = "v6";
    _fieldNames[6] = "v7";
    return ("Statics", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get v1 */
  function getV1(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (uint256 v1) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Get v1 (using the specified store) */
  function getV1(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (uint256 v1) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (uint256(Bytes.slice32(_blob, 0)));
  }

  /** Set v1 */
  function setV1(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, uint256 v1) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((v1)));
  }

  /** Set v1 (using the specified store) */
  function setV1(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    uint256 v1
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((v1)));
  }

  /** Get v2 */
  function getV2(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (int32 v2) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Get v2 (using the specified store) */
  function getV2(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (int32 v2) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (int32(uint32(Bytes.slice4(_blob, 0))));
  }

  /** Set v2 */
  function setV2(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, int32 v2) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((v2)));
  }

  /** Set v2 (using the specified store) */
  function setV2(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    int32 v2
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((v2)));
  }

  /** Get v3 */
  function getV3(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (bytes16 v3) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
    return (Bytes.slice16(_blob, 0));
  }

  /** Get v3 (using the specified store) */
  function getV3(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (bytes16 v3) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
    return (Bytes.slice16(_blob, 0));
  }

  /** Set v3 */
  function setV3(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, bytes16 v3) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 2, abi.encodePacked((v3)));
  }

  /** Set v3 (using the specified store) */
  function setV3(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    bytes16 v3
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 2, abi.encodePacked((v3)));
  }

  /** Get v4 */
  function getV4(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (address v4) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 3);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Get v4 (using the specified store) */
  function getV4(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (address v4) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 3);
    return (address(Bytes.slice20(_blob, 0)));
  }

  /** Set v4 */
  function setV4(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, address v4) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 3, abi.encodePacked((v4)));
  }

  /** Set v4 (using the specified store) */
  function setV4(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    address v4
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 3, abi.encodePacked((v4)));
  }

  /** Get v5 */
  function getV5(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (bool v5) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 4);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Get v5 (using the specified store) */
  function getV5(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (bool v5) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 4);
    return (_toBool(uint8(Bytes.slice1(_blob, 0))));
  }

  /** Set v5 */
  function setV5(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, bool v5) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 4, abi.encodePacked((v5)));
  }

  /** Set v5 (using the specified store) */
  function setV5(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    bool v5
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 4, abi.encodePacked((v5)));
  }

  /** Get v6 */
  function getV6(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (Enum1 v6) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 5);
    return Enum1(uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get v6 (using the specified store) */
  function getV6(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (Enum1 v6) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 5);
    return Enum1(uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set v6 */
  function setV6(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, Enum1 v6) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 5, abi.encodePacked(uint8(v6)));
  }

  /** Set v6 (using the specified store) */
  function setV6(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    Enum1 v6
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 5, abi.encodePacked(uint8(v6)));
  }

  /** Get v7 */
  function getV7(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (Enum2 v7) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 6);
    return Enum2(uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get v7 (using the specified store) */
  function getV7(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (Enum2 v7) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 6);
    return Enum2(uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set v7 */
  function setV7(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7, Enum2 v7) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setField(_tableId, _keyTuple, 6, abi.encodePacked(uint8(v7)));
  }

  /** Set v7 (using the specified store) */
  function setV7(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    Enum2 v7
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setField(_tableId, _keyTuple, 6, abi.encodePacked(uint8(v7)));
  }

  /** Get the full data */
  function get(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (StaticsData memory _table) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal view returns (StaticsData memory _table) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    uint256 v1,
    int32 v2,
    bytes16 v3,
    address v4,
    bool v5,
    Enum1 v6,
    Enum2 v7
  ) internal {
    bytes memory _data = encode(v1, v2, v3, v4, v5, v6, v7);

    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    uint256 v1,
    int32 v2,
    bytes16 v3,
    address v4,
    bool v5,
    Enum1 v6,
    Enum2 v7
  ) internal {
    bytes memory _data = encode(v1, v2, v3, v4, v5, v6, v7);

    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    StaticsData memory _table
  ) internal {
    set(k1, k2, k3, k4, k5, k6, k7, _table.v1, _table.v2, _table.v3, _table.v4, _table.v5, _table.v6, _table.v7);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7,
    StaticsData memory _table
  ) internal {
    set(
      _store,
      k1,
      k2,
      k3,
      k4,
      k5,
      k6,
      k7,
      _table.v1,
      _table.v2,
      _table.v3,
      _table.v4,
      _table.v5,
      _table.v6,
      _table.v7
    );
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (StaticsData memory _table) {
    _table.v1 = (uint256(Bytes.slice32(_blob, 0)));

    _table.v2 = (int32(uint32(Bytes.slice4(_blob, 32))));

    _table.v3 = (Bytes.slice16(_blob, 36));

    _table.v4 = (address(Bytes.slice20(_blob, 52)));

    _table.v5 = (_toBool(uint8(Bytes.slice1(_blob, 72))));

    _table.v6 = Enum1(uint8(Bytes.slice1(_blob, 73)));

    _table.v7 = Enum2(uint8(Bytes.slice1(_blob, 74)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(
    uint256 v1,
    int32 v2,
    bytes16 v3,
    address v4,
    bool v5,
    Enum1 v6,
    Enum2 v7
  ) internal pure returns (bytes memory) {
    return abi.encodePacked(v1, v2, v3, v4, v5, v6, v7);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    return _keyTuple;
  }

  /* Delete all data for given keys */
  function deleteRecord(uint256 k1, int32 k2, bytes16 k3, address k4, bool k5, Enum1 k6, Enum2 k7) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(
    IStore _store,
    uint256 k1,
    int32 k2,
    bytes16 k3,
    address k4,
    bool k5,
    Enum1 k6,
    Enum2 k7
  ) internal {
    bytes32[] memory _keyTuple;
    /// @solidity memory-safe-assembly
    assembly {
      // Allocate memory
      _keyTuple := mload(0x40)
      let _keyTupleLength := 256
      mstore(0x40, add(_keyTuple, _keyTupleLength))
      // Store length
      mstore(_keyTuple, 7)
    }
    _keyTuple[0] = bytes32(uint256(k1));
    _keyTuple[1] = bytes32(uint256(int256(k2)));
    _keyTuple[2] = bytes32(k3);
    _keyTuple[3] = bytes32(uint256(uint160(k4)));
    _keyTuple[4] = _boolToBytes32(k5);
    _keyTuple[5] = bytes32(uint256(uint8(k6)));
    _keyTuple[6] = bytes32(uint256(uint8(k7)));

    _store.deleteRecord(_tableId, _keyTuple);
  }
}

function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}

function _boolToBytes32(bool value) pure returns (bytes32 result) {
  assembly {
    result := value
  }
}
