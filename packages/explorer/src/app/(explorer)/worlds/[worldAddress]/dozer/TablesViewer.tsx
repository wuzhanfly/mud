import { ArrowUpDown, Loader } from "lucide-react";
import { Hex } from "viem";
import { useMemo, useState } from "react";
import { internalTableNames } from "@latticexyz/store-sync/sqlite";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../../../../components/ui/Button";
import { Checkbox } from "../../../../../components/ui/Checkbox";
import { Input } from "../../../../../components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../components/ui/Table";
import { useDozerQuery } from "../../../../../queries/useDozerQuery";
import { bufferToBigInt } from "../utils/bufferToBigInt";
import { Table as TableType } from "./DozerListener2";
import { EditableTableCell } from "./EditableTableCell";

type Props = {
  query: string | undefined;
  table: TableType;
};

export function TablesViewer({ table: selectedTable, query }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [showAllColumns, setShowAllColumns] = useState(false);

  // TODO: set proper query key
  const { data } = useDozerQuery([selectedTable?.name], query);

  const keySchema = selectedTable?.schema;
  const schema = selectedTable?.schema;

  const columns: ColumnDef<{}>[] = useMemo(() => {
    if (!schema) return [];

    const formattedSchema = Object.keys(schema).map(function (key) {
      return {
        name: key,
        type: schema[key].type,
      };
    });

    return formattedSchema?.map(({ name, type }: { name: string; type: string }) => {
      return {
        accessorKey: name,
        header: ({
          column,
        }: {
          column: {
            toggleSorting: (ascending: boolean) => void;
            getIsSorted: () => "asc" | "desc" | undefined;
          };
        }) => {
          return (
            <Button
              variant="ghost"
              className="-ml-4"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              <span className="text-orange-500">{name}</span>
              <span className="ml-1 opacity-70">
                {/* ({mudTableConfig?.key_schema[name] || mudTableConfig?.value_schema[name] || type.toLowerCase()}) */}
              </span>
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({
          row,
        }: {
          row: {
            getValue: (name: string) => string;
          };
        }) => {
          // const keysSchema = Object.keys(mudTableConfig?.key_schema || {});
          // const keyTuple = keysSchema.map((key) => row.getValue(key));
          const value = row.getValue(name);
          // if ((selectedTable && (internalTableNames as string[]).includes(selectedTable)) || keysSchema.includes(name)) {
          //   return value?.toString();
          // }

          // return <EditableTableCell config={mudTableConfig} keyTuple={keyTuple} name={name} value={value?.toString()} />;

          return <div>{value}</div>;
        },
      };
    });
  }, [schema]);

  const formattedData = useMemo(() => {
    if (!schema) return [];

    const formattedSchema = Object.keys(schema).map(function (key) {
      return {
        name: key,
        type: schema[key].type,
      };
    });

    return data?.rows?.map((row) => {
      console.log(row[0]);

      const formattedRow = {};

      for (const [index, column] of formattedSchema.entries()) {
        formattedRow[column.name] = row[index];
      }

      console.log(formattedRow);

      return formattedRow;
    });
  }, [schema, data?.rows]);

  const table = useReactTable({
    data: formattedData,
    columns,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-4 pb-4">
        <Input
          placeholder="Filter all columns..."
          value={globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm rounded border px-2 py-1"
        />

        <div className="items-top flex space-x-2">
          <Checkbox
            id="show-all-columns"
            checked={showAllColumns}
            onCheckedChange={() => {
              setShowAllColumns(!showAllColumns);
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="show-all-columns"
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show all columns
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="flex items-center justify-between gap-4 pb-4">
  // ....
  //     </div>

  //     {/* <div className="flex items-center justify-end space-x-2 py-4">
  //       <div className="space-x-2">
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => table.previousPage()}
  //           disabled={!table.getCanPreviousPage()}
  //         >
  //           Previous
  //         </Button>
  //         <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
  //           Next
  //         </Button>
  //       </div>
  //     </div> */}
  //   </>
  // );
}
