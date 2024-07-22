import { createStore as createZustandStore } from "zustand/vanilla";
import { StoreApi } from "zustand";
import { mutative } from "zustand-mutative";
import { dynamicAbiTypeToDefaultValue, staticAbiTypeToDefaultValue } from "@latticexyz/schema-type/internal";
import { Unsubscribe, TableRecord, TableUpdates, Key, Keys, TableLabel, StoreRecords, TableRecords } from "./common";
import { Table } from "@latticexyz/config";
import { AbiTypeScope, TableInput, TablesInput, resolveTable, resolveTables } from "@latticexyz/store/config/v2";

export type TablesConfig = {
  readonly [namespace: string]: TablesInput;
};

type TableUpdatesSubscriber = (updates: TableUpdates) => void;

type State = {
  config: {
    [namespace: string]: {
      [tableConfig: string]: Table;
    };
  };
  records: StoreRecords;
};

type SetRecordArgs = {
  tableLabel: TableLabel;
  key: Key;
  record: TableRecord;
};

type DeleteRecordArgs = {
  tableLabel: TableLabel;
  key: Key;
};

type GetRecordArgs = {
  tableLabel: TableLabel;
  key: Key;
};

type GetRecordsArgs = {
  tableLabel: TableLabel;
  keys?: Key[];
};

type SubscribeArgs = {
  tableLabel: TableLabel;
  subscriber: TableUpdatesSubscriber;
};

type GetKeysArgs = {
  tableLabel: TableLabel;
};

type DecodeKeyArgs = {
  tableLabel: TableLabel;
  encodedKey: string;
};

type Actions = {
  actions: {
    /**
     * Set a record in a table. If a partial record is provided, existing fields stay unchanged
     * and non-existing fields are initialized with the default value for this field.
     * Key fields of the record are always set to the provided key.
     */
    setRecord: (args: SetRecordArgs) => void;
    /**
     * Delete a record in a table.
     */
    deleteRecord: (args: DeleteRecordArgs) => void;
    /**
     * Get a record from a table.
     */
    getRecord: (args: GetRecordArgs) => TableRecord;
    /**
     * Get records from a table.
     */
    getRecords: (args: GetRecordsArgs) => TableRecords;
    /**
     * Dynamically register a new table in the store
     * @returns A bound Table object for easier interaction with the table.
     */
    registerTable: (config: TableInput) => BoundTable;
    /**
     * @returns A bound Table object for easier interaction with the table.
     */
    getTable: (tableLabel: TableLabel) => BoundTable;
    /**
     * Add a subscriber for record updates on a table.
     * @returns A function to unsubscribe the subscriber.
     */
    subscribe: (args: SubscribeArgs) => Unsubscribe;
    /**
     * Turn the encoded key into the decoded key for the provided table
     * @returns Key
     */
    decodeKey: (args: DecodeKeyArgs) => Key;
    /**
     * Get keys from the table
     */
    getKeys: (args: GetKeysArgs) => Keys;
    // TODO: add setRecords (batch), getRecords, getKeys, getConfig, find (get records with filter on key or value)
  };
};

export type Store = StoreApi<State & Actions>;

type BoundSetRecordArgs = {
  key: Key;
  record: TableRecord;
};

type BoundDeleteRecordArgs = {
  key: Key;
};

type BoundGetRecordArgs = {
  key: Key;
};

type BoundGetRecordsArgs = {
  keys?: Key[];
};

type BoundSubscribeArgs = {
  subscriber: TableUpdatesSubscriber;
};

type BoundDecodeKeyArgs = {
  encodedKey: string;
};

export type BoundTable = {
  tableLabel: TableLabel;
  getRecord: (args: BoundGetRecordArgs) => TableRecord;
  getRecords: (args?: BoundGetRecordsArgs) => TableRecords;
  setRecord: (args: BoundSetRecordArgs) => void;
  deleteRecord: (args: BoundDeleteRecordArgs) => void;
  getKeys: () => Keys;
  decodeKey: (args: BoundDecodeKeyArgs) => Key;
  getConfig: () => Table;
  subscribe: (args: BoundSubscribeArgs) => Unsubscribe;
};

type Subscribers = {
  [namespace: string]: {
    [table: string]: Set<TableUpdatesSubscriber>;
  };
};

/**
 * Initializes a Zustand store based on the provided table configs.
 */
export function createStore(tablesConfig: TablesConfig): Store {
  const subscribers: Subscribers = {};

  return createZustandStore<State & Actions>()(
    mutative((set, get) => {
      const state: State = { config: {}, records: {} };

      for (const [namespace, tables] of Object.entries(tablesConfig)) {
        const resolvedTables = resolveTables(tables, AbiTypeScope);
        for (const [label, tableConfig] of Object.entries(resolvedTables)) {
          // TODO: add option to resolveTables to not add codegen/deploy?
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { codegen, deploy, ...relevantConfig } = tableConfig;

          // Set config for tables
          state.config[namespace] ??= {};
          state.config[namespace][label] = relevantConfig;

          // Init records map for tables
          state.records[namespace] ??= {};
          state.records[namespace][label] = {};

          // Init subscribers set for tables
          subscribers[namespace] ??= {};
          subscribers[namespace][label] ??= new Set();
        }
      }

      /**
       * Encode a key object into a string that can be used as index in the store
       * TODO: Benchmark performance of this function
       */
      function encodeKey({ label, namespace }: TableLabel, key: Key): string {
        const keyOrder = get().config[namespace ?? ""][label].key;
        return keyOrder
          .map((keyName) => {
            const keyValue = key[keyName];
            if (keyValue == null) {
              throw new Error(`Provided key is missing field ${keyName}.`);
            }
            return key[keyName];
          })
          .join("|");
      }

      const getRecord = ({ tableLabel, key }: GetRecordArgs) => {
        return get().records[tableLabel.namespace ?? ""][tableLabel.label][encodeKey(tableLabel, key)];
      };

      const getRecords = ({ tableLabel, keys }: GetRecordsArgs) => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;
        const records = get().records[namespace][label];

        if (!keys) {
          return records;
        }

        return Object.fromEntries(
          keys.map((key) => {
            const encodedKey = encodeKey(tableLabel, key);
            return [encodedKey, records[encodedKey]];
          }),
        );
      };

      // TODO: Benchmark performance of this function.
      const setRecord = ({ tableLabel, key, record }: SetRecordArgs) => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;

        if (get().config[namespace] == null) {
          throw new Error(`Table '${namespace}__${label}' is not registered yet.`);
        }

        const encodedKey = encodeKey(tableLabel, key);
        const prevRecord = get().records[namespace][label][encodedKey];
        const schema = get().config[namespace][label].schema;
        const newRecord = Object.fromEntries(
          Object.keys(schema).map((fieldName) => [
            fieldName,
            key[fieldName] ?? // Key fields in record must match the key
              record[fieldName] ?? // Override provided record fields
              prevRecord?.[fieldName] ?? // Keep existing non-overridden fields
              staticAbiTypeToDefaultValue[schema[fieldName] as never] ?? // Default values for new fields
              dynamicAbiTypeToDefaultValue[schema[fieldName] as never],
          ]),
        );

        // Update record
        set((prev) => {
          prev.records[tableLabel.namespace ?? ""][tableLabel.label][encodedKey] = newRecord;
        });

        // Notify table subscribers
        subscribers[namespace][label].forEach((subscriber) =>
          subscriber({ [encodedKey]: { prev: prevRecord && { ...prevRecord }, current: newRecord } }),
        );
      };

      const deleteRecord = ({ tableLabel, key }: DeleteRecordArgs) => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;
        if (get().config[namespace] == null) {
          throw new Error(`Table '${namespace}__${label}' is not registered yet.`);
        }

        const encodedKey = encodeKey(tableLabel, key);
        const prevRecord = get().records[namespace][label][encodedKey];

        // Delete record
        set((prev) => {
          delete prev.records[tableLabel.namespace ?? ""][tableLabel.label][encodedKey];
        });

        // Notify table subscribers
        subscribers[namespace][label].forEach((subscriber) =>
          subscriber({ [encodedKey]: { prev: prevRecord && { ...prevRecord }, current: undefined } }),
        );
      };

      const subscribe = ({ tableLabel, subscriber }: SubscribeArgs): Unsubscribe => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;

        subscribers[namespace][label].add(subscriber);
        return () => subscribers[namespace][label].delete(subscriber);
      };

      const decodeKey = ({ tableLabel, encodedKey }: DecodeKeyArgs): Key => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;
        const keyFields = get().config[namespace][label].key;
        const record = get().records[namespace][label][encodedKey];

        // Typecast needed because record values could be arrays, but we know they are not if they are key fields
        return Object.fromEntries(Object.entries(record).filter(([field]) => keyFields.includes(field))) as never;
      };

      const getKeys = ({ tableLabel }: GetKeysArgs): Keys => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;

        return Object.fromEntries(
          Object.keys(get().records[namespace][label]).map((encodedKey) => [
            encodedKey,
            decodeKey({ tableLabel, encodedKey }),
          ]),
        );
      };

      const getTable = (tableLabel: TableLabel): BoundTable => {
        const namespace = tableLabel.namespace ?? "";
        const label = tableLabel.label;

        return {
          tableLabel,
          setRecord: ({ key, record }: BoundSetRecordArgs) => setRecord({ tableLabel, key, record }),
          deleteRecord: ({ key }: BoundDeleteRecordArgs) => deleteRecord({ tableLabel, key }),
          getRecord: ({ key }: BoundGetRecordArgs) => getRecord({ tableLabel, key }),
          getRecords: (args?: BoundGetRecordsArgs) => getRecords({ tableLabel, keys: args?.keys }),
          getKeys: () => getKeys({ tableLabel }),
          decodeKey: ({ encodedKey }: BoundDecodeKeyArgs) => decodeKey({ tableLabel, encodedKey }),
          getConfig: () => get().config[namespace][label],
          subscribe: ({ subscriber }: BoundSubscribeArgs) => subscribe({ tableLabel, subscriber }),

          // TODO: dynamically add setters and getters for individual fields of the table
        };
      };

      const registerTable = (tableInput: TableInput): BoundTable => {
        // TODO: add option to resolveTable to not include codegen/deploy options?
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { codegen, deploy, ...tableConfig } = resolveTable(tableInput);
        set((prev) => {
          const { namespace, label } = tableConfig;
          // Set config for table
          prev.config[namespace] ??= {};
          // TODO figure out type issue here - looks like mutative removes the `readonly` type
          prev.config[namespace][label] = tableConfig as never;

          // Init records map for table
          prev.records[namespace] ??= {};
          prev.records[namespace][label] ??= {};

          // Init subscribers set for table
          subscribers[namespace] ??= {};
          subscribers[namespace][label] ??= new Set();
        });
        return getTable(tableConfig);
      };

      return {
        ...state,
        actions: {
          setRecord,
          deleteRecord,
          getRecord,
          getRecords,
          getTable,
          registerTable,
          subscribe,
          decodeKey,
          getKeys,
        },
      };
    }),
  );
}
