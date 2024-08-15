import { Query, Store, StoreConfig } from "../common";
import { DecodeKeyArgs, DecodeKeyResult, decodeKey } from "../actions/decodeKey";
import { DeleteRecordArgs, DeleteRecordResult, deleteRecord } from "../actions/deleteRecord";
import { EncodeKeyArgs, EncodeKeyResult, encodeKey } from "../actions/encodeKey";
import { GetConfigArgs, GetConfigResult, getConfig } from "../actions/getConfig";
import { GetKeysArgs, GetKeysResult, getKeys } from "../actions/getKeys";
import { GetRecordArgs, GetRecordResult, getRecord } from "../actions/getRecord";
import { GetRecordsArgs, GetRecordsResult, getRecords } from "../actions/getRecords";
import { GetTableArgs, GetTableResult, getTable } from "../actions/getTable";
import { GetTablesResult, getTables } from "../actions/getTables";
import { RegisterTableArgs, RegisterTableResult, registerTable } from "../actions/registerTable";
import { RunQueryArgs, RunQueryOptions, RunQueryResult, runQuery } from "../actions/runQuery";
import { SetRecordArgs, SetRecordResult, setRecord } from "../actions/setRecord";
import { SetRecordsArgs, SetRecordsResult, setRecords } from "../actions/setRecords";
import { SubscribeQueryArgs, SubscribeQueryResult, subscribeQuery } from "../actions/subscribeQuery";
import { SubscribeStoreArgs, SubscribeStoreResult, subscribeStore } from "../actions/subscribeStore";
import { SubscribeTableArgs, SubscribeTableResult, subscribeTable } from "../actions/subscribeTable";
import { Table } from "@latticexyz/config";

export type StoreBoundDecodeKeyArgs<table extends Table = Table> = Omit<DecodeKeyArgs<table>, "stash">;
export type StoreBoundDeleteRecordArgs<table extends Table> = Omit<DeleteRecordArgs<table>, "stash">;
export type StoreBoundEncodeKeyArgs<table extends Table = Table> = EncodeKeyArgs<table>;
export type StoreBoundGetConfigArgs = Omit<GetConfigArgs, "stash">;
export type StoreBoundGetKeysArgs<table extends Table = Table> = Omit<GetKeysArgs<table>, "stash">;
export type StoreBoundGetRecordArgs<table extends Table = Table> = Omit<GetRecordArgs<table>, "stash">;
export type StoreBoundGetRecordsArgs<table extends Table = Table> = Omit<GetRecordsArgs<table>, "stash">;
export type StoreBoundGetTableArgs<table extends Table = Table> = Omit<GetTableArgs<table>, "stash">;
export type StoreBoundRegisterTableArgs<table extends Table = Table> = Omit<RegisterTableArgs<table>, "stash">;
export type StoreBoundRunQueryArgs<
  query extends Query = Query,
  options extends RunQueryOptions = RunQueryOptions,
> = Omit<RunQueryArgs<query, options>, "stash">;
export type StoreBoundSetRecordArgs<table extends Table = Table> = Omit<SetRecordArgs<table>, "stash">;
export type StoreBoundSetRecordsArgs<table extends Table = Table> = Omit<SetRecordsArgs<table>, "stash">;
export type StoreBoundSubscribeQueryArgs<query extends Query = Query> = Omit<SubscribeQueryArgs<query>, "stash">;
export type StoreBoundSubscribeStoreArgs<config extends StoreConfig = StoreConfig> = Omit<
  SubscribeStoreArgs<config>,
  "stash"
>;
export type StoreBoundSubscribeTableArgs<table extends Table = Table> = Omit<SubscribeTableArgs<table>, "stash">;

export type DefaultActions<config extends StoreConfig = StoreConfig> = {
  decodeKey: <table extends Table>(args: StoreBoundDecodeKeyArgs<table>) => DecodeKeyResult<table>;
  deleteRecord: <table extends Table>(args: StoreBoundDeleteRecordArgs<table>) => DeleteRecordResult;
  encodeKey: <table extends Table>(args: StoreBoundEncodeKeyArgs<table>) => EncodeKeyResult;
  getConfig: (args: StoreBoundGetConfigArgs) => GetConfigResult;
  getKeys: <table extends Table>(args: StoreBoundGetKeysArgs<table>) => GetKeysResult<table>;
  getRecord: <table extends Table>(args: StoreBoundGetRecordArgs<table>) => GetRecordResult<table>;
  getRecords: <table extends Table>(args: StoreBoundGetRecordsArgs<table>) => GetRecordsResult<table>;
  getTable: <table extends Table>(args: StoreBoundGetTableArgs<table>) => GetTableResult<table>;
  getTables: () => GetTablesResult<config>;
  registerTable: <table extends Table>(args: StoreBoundRegisterTableArgs<table>) => RegisterTableResult<table>;
  runQuery: <query extends Query, options extends RunQueryOptions>(
    args: StoreBoundRunQueryArgs<query, options>,
  ) => RunQueryResult<query, options>;
  setRecord: <table extends Table>(args: StoreBoundSetRecordArgs<table>) => SetRecordResult;
  setRecords: <table extends Table>(args: StoreBoundSetRecordsArgs<table>) => SetRecordsResult;
  subscribeQuery: <query extends Query>(args: StoreBoundSubscribeQueryArgs<query>) => SubscribeQueryResult<query>;
  subscribeStore: (args: StoreBoundSubscribeStoreArgs<config>) => SubscribeStoreResult;
  subscribeTable: <table extends Table>(args: StoreBoundSubscribeTableArgs<table>) => SubscribeTableResult;
};

export function defaultActions<config extends StoreConfig>(stash: Store<config>): DefaultActions<config> {
  return {
    decodeKey: <table extends Table>(args: StoreBoundDecodeKeyArgs<table>) => decodeKey({ stash, ...args }),
    deleteRecord: <table extends Table>(args: StoreBoundDeleteRecordArgs<table>) => deleteRecord({ stash, ...args }),
    encodeKey: <table extends Table>(args: StoreBoundEncodeKeyArgs<table>) => encodeKey(args),
    getConfig: (args: StoreBoundGetConfigArgs) => getConfig({ stash, ...args }),
    getKeys: <table extends Table>(args: StoreBoundGetKeysArgs<table>) => getKeys({ stash, ...args }),
    getRecord: <table extends Table>(args: StoreBoundGetRecordArgs<table>) => getRecord({ stash, ...args }),
    getRecords: <table extends Table>(args: StoreBoundGetRecordsArgs<table>) => getRecords({ stash, ...args }),
    getTable: <table extends Table>(args: StoreBoundGetTableArgs<table>) => getTable({ stash, ...args }),
    getTables: () => getTables({ stash }),
    registerTable: <table extends Table>(args: StoreBoundRegisterTableArgs<table>) => registerTable({ stash, ...args }),
    runQuery: <query extends Query, options extends RunQueryOptions>(args: StoreBoundRunQueryArgs<query, options>) =>
      runQuery({ stash, ...args }),
    setRecord: <table extends Table>(args: StoreBoundSetRecordArgs<table>) => setRecord({ stash, ...args }),
    setRecords: <table extends Table>(args: StoreBoundSetRecordsArgs<table>) => setRecords({ stash, ...args }),
    subscribeQuery: <query extends Query>(args: StoreBoundSubscribeQueryArgs<query>) =>
      subscribeQuery({ stash, ...args }),
    subscribeStore: <config extends StoreConfig>(args: StoreBoundSubscribeStoreArgs<config>) =>
      subscribeStore({ stash, ...args }),
    subscribeTable: <table extends Table>(args: StoreBoundSubscribeTableArgs<table>) =>
      subscribeTable({ stash, ...args }),
  };
}
