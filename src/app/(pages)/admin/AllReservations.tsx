import { Button } from "@/app/components/shadcn/ui/button";
import { Input } from "@/app/components/shadcn/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/shadcn/ui/table";
import {
  AccessorColumnDef,
  ColumnDefBase,
  ColumnFiltersState,
  GroupColumnDef,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export type CellType = {
  eventDate: string;
  userId: string;
  userName: string;
  applyDate: string;
  isPaid: "支払済み" | "当日支払い";
};

export interface DisplayColumnDef<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue> {
  id: string;
  displayName?: string;
  accessorFn: (originalRow: TData) => TValue;
  accessorKey?: string;
}

export type ColumnDefType<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | AccessorColumnDef<TData, TValue>;

export const columns: ColumnDefType<CellType>[] = [
  {
    accessorKey: "eventDate",
    displayName: "イベント日",
    accessorFn: (originalRow: CellType) => {
      return originalRow.eventDate;
    },
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          イベント日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userName",
    displayName: "ユーザー名",
    accessorFn: (originalRow: CellType) => {
      return originalRow.userName;
    },
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ユーザー名
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userId",
    displayName: "ユーザーID",
    accessorFn: (originalRow: CellType) => {
      return originalRow.userId;
    },
    enableColumnFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ユーザーID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "applyDate",
    header: "申込日",
  },
  {
    accessorKey: "isPaid",
    header: "支払い状況",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDefType<TData, TValue>[];
  data: TData[];
}

const AllReservations = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filterableColumns = columns.filter(
    (column) => column.enableColumnFilter
  );

  return (
    <>
      <div className="sm:m-5 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center py-4">
          {filterableColumns.map((column) => {
            if ("displayName" in column) {
              return (
                <Input
                  key={column.id}
                  placeholder={`フィルター (${column.displayName})`}
                  value={
                    (table
                      .getColumn(column.accessorKey as string)
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(column.accessorKey as string)
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="whitespace-nowrap">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    該当データが存在しません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllReservations;
