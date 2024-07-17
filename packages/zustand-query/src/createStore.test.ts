import { describe, expect, it } from "vitest";
import { attest } from "@arktype/attest";
import { TablesConfig, createStore } from "./createStore";

describe("createStore", () => {
  it("should initialize the store", () => {
    const tablesConfig = {
      namespace1: {
        table1: {
          schema: {
            field1: "string",
            field2: "uint32",
          },
          key: ["field2"],
        },
      },
    } satisfies TablesConfig;
    const store = createStore(tablesConfig);

    attest(store.getState().config).snap({
      namespace1: {
        table1: {
          schema: { field1: "string", field2: "uint32" },
          key: ["field2"],
          namespace: "namespace1",
          label: "table1",
        },
      },
    });
    attest(store.getState().records).snap({ namespace1: { table1: {} } });
  });

  describe("setRecord", () => {
    it("should add the record to the table", () => {
      const tablesConfig = {
        namespace1: {
          table1: {
            schema: {
              field1: "string",
              field2: "uint32",
              field3: "int32",
            },
            key: ["field2", "field3"],
          },
        },
      } satisfies TablesConfig;

      const store = createStore(tablesConfig);
      store.getState().actions.setRecord({
        tableLabel: { label: "table1", namespace: "namespace1" },
        key: { field2: 1, field3: 2 },
        record: { field1: "hello" },
      });

      store.getState().actions.setRecord({
        tableLabel: { label: "table1", namespace: "namespace1" },
        key: { field2: 2, field3: 1 },
        record: { field1: "world" },
      });

      attest(store.getState().records).snap({
        namespace1: {
          table1: {
            "1|2": { field1: "hello", field2: 1, field3: 2 },
            "2|1": { field1: "world", field2: 2, field3: 1 },
          },
        },
      });
    });
  });

  describe("getRecord", () => {
    it("should get a record by key from the table", () => {
      const tablesConfig = {
        namespace1: {
          table1: {
            schema: {
              field1: "string",
              field2: "uint32",
              field3: "int32",
            },
            key: ["field2", "field3"],
          },
        },
      } satisfies TablesConfig;

      const store = createStore(tablesConfig);
      store.getState().actions.setRecord({
        tableLabel: { label: "table1", namespace: "namespace1" },
        key: { field2: 1, field3: 2 },
        record: { field1: "hello" },
      });

      store.getState().actions.setRecord({
        tableLabel: { label: "table1", namespace: "namespace1" },
        key: { field2: 2, field3: 1 },
        record: { field1: "world" },
      });

      attest(
        store.getState().actions.getRecord({
          tableLabel: { label: "table1", namespace: "namespace1" },
          key: { field2: 1, field3: 2 },
        }),
      ).snap({ field1: "hello", field2: 1, field3: 2 });

      attest(
        store.getState().actions.getRecord({
          tableLabel: { label: "table1", namespace: "namespace1" },
          key: { field2: 2, field3: 1 },
        }),
      ).snap({ field1: "world", field2: 2, field3: 1 });
    });
  });

  describe("registerTable", () => {
    it("should add a new table to the store and return a wrapped table", () => {
      const store = createStore({});
      const table = store.getState().actions.registerTable({
        label: "table1",
        namespace: "namespace1",
        schema: { field1: "uint32", field2: "address" },
        key: ["field1"],
      });

      attest(store.getState().config).snap({
        namespace1: {
          table1: {
            label: "table1",
            namespace: "namespace1",
            schema: { field1: "uint32", field2: "address" },
            key: ["field1"],
          },
        },
      });
      attest(store.getState().records).snap({ namespace1: { table1: {} } });
      expect(table.setRecord).toBeDefined();
      expect(table.getRecord).toBeDefined();
    });
  });

  describe("getTable", () => {
    it("should return a wrapped table", () => {
      const store = createStore({});
      store.getState().actions.registerTable({
        label: "table1",
        namespace: "namespace1",
        schema: { field1: "uint32", field2: "address" },
        key: ["field1"],
      });
      const table = store.getState().actions.getTable({ label: "table1", namespace: "namespace1" });

      expect(table.setRecord).toBeDefined();
      expect(table.getRecord).toBeDefined();
    });
  });
});
