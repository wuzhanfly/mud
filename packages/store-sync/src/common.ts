import { Address, Block, Hex, Log, PublicClient } from "viem";
import { StoreConfig, StoreEventsAbiItem, StoreEventsAbi, resolveUserTypes } from "@latticexyz/store";
import storeConfig from "@latticexyz/store/mud.config";
import { Observable } from "rxjs";
import { resourceToHex } from "@latticexyz/common";
import { UnionPick } from "@latticexyz/common/type-utils";
import { KeySchema, TableRecord, ValueSchema } from "@latticexyz/protocol-parser";

export type ChainId = number;
export type WorldId = `${ChainId}:${Address}`;

export type TableNamespace = string;
export type TableName = string;

export type Table = {
  address: Address;
  tableId: Hex;
  namespace: TableNamespace;
  name: TableName;
  keySchema: KeySchema;
  valueSchema: ValueSchema;
};

export type TableWithRecords = Table & { records: TableRecord[] };

export type StoreEventsLog = Log<bigint, number, false, StoreEventsAbiItem, true, StoreEventsAbi>;
export type BlockLogs = { blockNumber: StoreEventsLog["blockNumber"]; logs: StoreEventsLog[] };

export type SyncOptions<TConfig extends StoreConfig = StoreConfig> = {
  /**
   * MUD config
   */
  config?: TConfig;
  /**
   * [viem `PublicClient`][0] used for fetching logs from the RPC.
   *
   * [0]: https://viem.sh/docs/clients/public.html
   */
  publicClient: PublicClient;
  /**
   * MUD Store/World contract address
   */
  address?: Address;
  /**
   * Optional table IDs to filter indexer state and RPC state.
   */
  tableIds?: Hex[];
  /**
   * Optional block number to start indexing from. Useful for resuming the indexer from a particular point in time or starting after a particular contract deployment.
   */
  startBlock?: bigint;
  /**
   * Optional maximum block range, if your RPC limits the amount of blocks fetched at a time.
   */
  maxBlockRange?: bigint;
  /**
   * Optional MUD tRPC indexer URL to fetch initial state from.
   */
  indexerUrl?: string;
  /**
   * Optional initial state to hydrate from. Useful if you're hydrating from your own indexer or cache.
   */
  initialState?: {
    blockNumber: bigint | null;
    tables: TableWithRecords[];
  };
};

export type SyncResult = {
  latestBlock$: Observable<Block>;
  latestBlockNumber$: Observable<bigint>;
  blockLogs$: Observable<BlockLogs>;
  storedBlockLogs$: Observable<StorageAdapterBlock>;
  waitForTransaction: (tx: Hex) => Promise<void>;
};

// TODO: add optional, original log to this?
export type StorageAdapterLog = Partial<StoreEventsLog> & UnionPick<StoreEventsLog, "address" | "eventName" | "args">;
export type StorageAdapterBlock = { blockNumber: BlockLogs["blockNumber"]; logs: StorageAdapterLog[] };
export type StorageAdapter = (block: StorageAdapterBlock) => Promise<void>;

// TODO: adjust when we get namespace support (https://github.com/latticexyz/mud/issues/994) and when table has namespace key (https://github.com/latticexyz/mud/issues/1201)
// TODO: adjust when schemas are automatically resolved
export const schemasTable = {
  ...storeConfig.tables.Tables,
  valueSchema: resolveUserTypes(storeConfig.tables.Tables.valueSchema, storeConfig.userTypes),
};

export const schemasTableId = resourceToHex({
  type: schemasTable.offchainOnly ? "offchainTable" : "table",
  namespace: storeConfig.namespace,
  name: schemasTable.name,
});
