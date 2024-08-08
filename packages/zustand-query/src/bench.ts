import { bench } from "@ark/attest";
import { defineStore } from "@latticexyz/store";
import { runQuery } from "./runQuery";
import { createStore } from "./createStore";
import { In } from "./queryFragments";
import { getTable, setRecord } from "./actions";

const config = defineStore({
  tables: {
    Position: {
      schema: { player: "address", x: "int32", y: "int32" },
      key: ["player"],
    },
  },
});
const store = createStore(config);

bench("defineStore", () => {
  createStore(
    defineStore({
      tables: {
        Position: {
          schema: { player: "address", x: "int32", y: "int32" },
          key: ["player"],
        },
      },
    }),
  );
}).types([2119, "instantiations"]);

bench("boundTable", () => {
  const table = getTable(store, config.tables.Position);
  table.getRecord({ key: { player: "0x" } });
}).types([2, "instantiations"]);

bench("runQuery", () => {
  const { Position } = config.tables;
  runQuery(store, [In(Position)]);
}).types([10, "instantiations"]);

const filledStore = createStore(config);
const numItems = 10_000;
for (let i = 0; i < numItems; i++) {
  setRecord(filledStore, {
    table: config.tables.Position,
    key: { player: `0x${i}` },
    record: { x: i, y: i },
  });
}
bench("setRecord", () => {
  setRecord(filledStore, {
    table: config.tables.Position,
    key: { player: `0x0` },
    record: { x: 1, y: 1 },
  });
}).mark({ mean: [1.34, "ms"], median: [1.4, "ms"] });

bench("10x setRecord", () => {
  for (let i = 0; i < 10; i++) {
    setRecord(filledStore, {
      table: config.tables.Position,
      key: { player: `0x${i}` },
      record: { x: i + 1, y: i + 1 },
    });
  }
}).mark({ mean: [13.4, "ms"], median: [13.4, "ms"] });
