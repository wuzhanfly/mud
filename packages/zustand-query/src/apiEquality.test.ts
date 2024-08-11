import { describe, expect, it } from "vitest";
import { createStore } from "./createStore";
import { attest } from "@ark/attest";
import { BoundTable } from "./actions/getTable";
import { DefaultActions } from "./decorators/default";

describe("store actions, bound table", () => {
  const store = createStore();
  const Position = store.registerTable({
    table: {
      label: "Position",
      schema: { player: "address", x: "uint32", y: "uint32" },
      key: ["player"],
    },
  });

  it("should expose the same functionality", () => {
    const excludedStoreKeys = [
      "registerTable",
      "getTable",
      "getTables",
      "extend",
      "runQuery",
      "subscribeQuery",
      "subscribeTable", // renamed to subscribe in table API
      "_",
      "get",
    ] as const;

    const excludedTableKeys = [
      "subscribe", // renamed from subscribeTable in store API
    ] as const;

    attest<
      keyof Omit<BoundTable, (typeof excludedTableKeys)[number]>,
      keyof Omit<DefaultActions, (typeof excludedStoreKeys)[number]>
    >();
    attest<
      keyof Omit<DefaultActions, (typeof excludedStoreKeys)[number]>,
      keyof Omit<BoundTable, (typeof excludedTableKeys)[number]>
    >();
    expect(Object.keys(Position).filter((key) => !excludedTableKeys.includes(key as never))).toEqual(
      Object.keys(store).filter((key) => !excludedStoreKeys.includes(key as never)),
    );
  });
});