'use client';
import { useState } from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import TableLoader from '@/atoms/Loaders/TableLoader';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import Pagination from '@/atoms/pagination';
import { DataTableToolbar } from './DataTableToolbar';
import { EnumAdminQueryType } from '@/store/AdminStore';

interface DataTableProps {
  columns: ColumnDef<TAdminPatientItem>[];
  data: TAdminPatientItem[];
  pagination: TPaginationResponse;
  isLoading: boolean;
}

const PatientsTable = ({ columns, data, pagination, isLoading }: DataTableProps) => {
  const {
    AdminStore: { queries, setLimit, setPage }
  } = useStore();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <div className="rounded-xl bg-white">
      <div className="p-3">
        <h2 className="mb-4 text-xl font-semibold">Patient Management</h2>
        <DataTableToolbar />
      </div>

      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ''}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {isLoading ? (
            <TableLoader rows={20} columns={7} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="group/row">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className ?? ''}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>

      <div className="p-3">
        {isLoading || (
          <Pagination
            limit={queries.PATIENTS.limit ?? Number(pagination.limit)}
            setLimit={(limit) => setLimit(limit, EnumAdminQueryType.PATIENTS)}
            currentPage={queries.PATIENTS.page ?? Number(pagination.page)}
            setPage={(page) => setPage(page, EnumAdminQueryType.PATIENTS)}
            total={pagination.total}
            totalPages={pagination.totalPages}
            siblingCount={1}
          />
        )}
      </div>
    </div>
  );
};

export default observer(PatientsTable);
