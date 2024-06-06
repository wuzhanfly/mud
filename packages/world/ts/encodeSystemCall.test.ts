/* eslint-disable max-len */
import { describe, expect, it } from "vitest";
import { encodeSystemCall } from "./encodeSystemCall";
import { resourceToHex } from "@latticexyz/common";
import AccessManagementSystemAbi from "@latticexyz/world/out/AccessManagementSystem.sol/AccessManagementSystem.abi.json";
import StoreRegistrationSystem from "@latticexyz/world/out/StoreRegistrationSystem.sol/StoreRegistrationSystem.abi.json";

describe("SystemCall", () => {
  it("encodes grantAccess properly", async () => {
    const resourceId = resourceToHex({ type: "table", namespace: "", name: "myTable" });
    const grantee = "0x943728592c20aed37a35c15235466f7a7cd00bd0";

    expect(
      encodeSystemCall({
        abi: AccessManagementSystemAbi,
        systemId: resourceToHex({ type: "system", namespace: "", name: "" }),
        functionName: "grantAccess",
        args: [resourceId, grantee],
      }),
    ).toMatchInlineSnapshot(`
      [
        "0x7379000000000000000000000000000000000000000000000000000000000000",
        "0x40554c3a746200000000000000000000000000006d795461626c65000000000000000000000000000000000000000000943728592c20aed37a35c15235466f7a7cd00bd0",
      ]
    `);
  });

  it("encodes registerTable properly", async () => {
    const tableId = resourceToHex({ type: "table", namespace: "", name: "myTable" });
    const fieldLayout = "0x000000000000000000000000000000000000000000000000000000000000000";
    const keySchema = "0x000000000000000000000000000000000000000000000000000000000000000";
    const valueSchema = "0x000000000000000000000000000000000000000000000000000000000000000";
    const keyNames = ["key1", "key1"];
    const fieldNames = ["field1", "field2"];

    expect(
      encodeSystemCall({
        abi: StoreRegistrationSystem,
        systemId: resourceToHex({ type: "system", namespace: "", name: "" }),
        functionName: "registerTable",
        args: [tableId, fieldLayout, keySchema, valueSchema, keyNames, fieldNames],
      }),
    ).toMatchInlineSnapshot(`
      [
        "0x7379000000000000000000000000000000000000000000000000000000000000",
        "0x0ba51f49746200000000000000000000000000006d795461626c6500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000046b6579310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000046b6579310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000066669656c6431000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066669656c64320000000000000000000000000000000000000000000000000000",
      ]
    `);
  });
});
