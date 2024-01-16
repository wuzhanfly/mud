// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

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
import { FieldLayout, FieldLayoutLib } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { RESOURCE_TABLE, RESOURCE_OFFCHAIN_TABLE } from "@latticexyz/store/src/storeResourceTypes.sol";

ResourceId constant _tableId = ResourceId.wrap(
  bytes32(abi.encodePacked(RESOURCE_TABLE, bytes14(""), bytes16("Inventory")))
);
ResourceId constant InventoryTableId = _tableId;

FieldLayout constant _fieldLayout = FieldLayout.wrap(
  0x0004010004000000000000000000000000000000000000000000000000000000
);

library Inventory {
  /**
   * @notice Get the table values' field layout.
   * @return _fieldLayout The field layout for the table.
   */
  function getFieldLayout() internal pure returns (FieldLayout) {
    return _fieldLayout;
  }

  /**
   * @notice Get the table's key schema.
   * @return _keySchema The key schema for the table.
   */
  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _keySchema = new SchemaType[](3);
    _keySchema[0] = SchemaType.ADDRESS;
    _keySchema[1] = SchemaType.UINT32;
    _keySchema[2] = SchemaType.UINT32;

    return SchemaLib.encode(_keySchema);
  }

  /**
   * @notice Get the table's value schema.
   * @return _valueSchema The value schema for the table.
   */
  function getValueSchema() internal pure returns (Schema) {
    SchemaType[] memory _valueSchema = new SchemaType[](1);
    _valueSchema[0] = SchemaType.UINT32;

    return SchemaLib.encode(_valueSchema);
  }

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](3);
    keyNames[0] = "owner";
    keyNames[1] = "item";
    keyNames[2] = "itemVariant";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](1);
    fieldNames[0] = "amount";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, getKeySchema(), getValueSchema(), getKeyNames(), getFieldNames());
  }

  /**
   * @notice Get amount.
   */
  function getAmount(address owner, uint32 item, uint32 itemVariant) internal view returns (uint32 amount) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint32(bytes4(_blob)));
  }

  /**
   * @notice Get amount.
   */
  function _getAmount(address owner, uint32 item, uint32 itemVariant) internal view returns (uint32 amount) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint32(bytes4(_blob)));
  }

  /**
   * @notice Get amount.
   */
  function get(address owner, uint32 item, uint32 itemVariant) internal view returns (uint32 amount) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint32(bytes4(_blob)));
  }

  /**
   * @notice Get amount.
   */
  function _get(address owner, uint32 item, uint32 itemVariant) internal view returns (uint32 amount) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint32(bytes4(_blob)));
  }

  /**
   * @notice Set amount.
   */
  function setAmount(address owner, uint32 item, uint32 itemVariant, uint32 amount) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((amount)), _fieldLayout);
  }

  /**
   * @notice Set amount.
   */
  function _setAmount(address owner, uint32 item, uint32 itemVariant, uint32 amount) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((amount)), _fieldLayout);
  }

  /**
   * @notice Set amount.
   */
  function set(address owner, uint32 item, uint32 itemVariant, uint32 amount) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((amount)), _fieldLayout);
  }

  /**
   * @notice Set amount.
   */
  function _set(address owner, uint32 item, uint32 itemVariant, uint32 amount) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((amount)), _fieldLayout);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(address owner, uint32 item, uint32 itemVariant) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(address owner, uint32 item, uint32 itemVariant) internal {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack static (fixed length) data using this table's schema.
   * @return The static data, encoded into a sequence of bytes.
   */
  function encodeStatic(uint32 amount) internal pure returns (bytes memory) {
    return abi.encodePacked(amount);
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dynamic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(uint32 amount) internal pure returns (bytes memory, PackedCounter, bytes memory) {
    bytes memory _staticData = encodeStatic(amount);

    PackedCounter _encodedLengths;
    bytes memory _dynamicData;

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(address owner, uint32 item, uint32 itemVariant) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](3);
    _keyTuple[0] = bytes32(uint256(uint160(owner)));
    _keyTuple[1] = bytes32(uint256(item));
    _keyTuple[2] = bytes32(uint256(itemVariant));

    return _keyTuple;
  }
}
