"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DatePicker from "@/components/DatePicker"
import TablePagination from "@/components/TabelPagination"
import DataTableViewOptions from "@/components/TableViewOptions"

import AddBarang from "./actions/add-barang"
import EditBarang from "./actions/edit-barang"
import { useGetKategoriProduct, useGetProduct } from "@/app/react-query/action"
import { setStateDataBarangQuery } from "@/app/state/store/queryInput/store"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
  })
  return (
    <>
      <FilterForm />
      <div className='mt-6 space-y-2'>
        <div className='flex justify-between'>
          <div className=''>
            <AddBarang />
          </div>
          <div className='px-3 hidden'>
            <EditBarang />
          </div>
          <DataTableViewOptions table={table} />
        </div>
        <div className='rounded-md border px-2'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
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
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <>
          <TablePagination table={table} />
        </>
      </div>
    </>
  )
}

const FilterForm = () => {
  useGetKategoriProduct()
  const { data: kategori } = useGetKategoriProduct()
  const { setDataBarangQuery } = setStateDataBarangQuery()
  const form = useForm({
    defaultValues: {
      namaProduk: "",
      date: undefined,
      kategori: 0
    },
  })
  const onSubmit = (value: any) => {
    const validateSubmit = {
      ...value,
      kategori: parseInt(value.kategori),
      produk: value.namaProduk.toUpperCase()
    }

    setDataBarangQuery(validateSubmit)
    console.log("data values : ", validateSubmit)
  }
  return (
    <div className='mb-2 flex flex-wrap gap-2'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-wrap gap-2'
        >
          <FormField
            control={form.control}
            name='namaProduk'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Filter Nama Produk...'
                    className='w-60'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='kategori'
            render={({ field }) => (
              <Select value={field.value.toString()} onValueChange={field.onChange}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Pilih Kategori' />
                </SelectTrigger>
                <SelectContent>
                {kategori?.data?.map((item: any) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.kategoriObat}
                              </SelectItem>
                            ))}
                </SelectContent>
              </Select>
            )}
          />
          <Button type='submit'>Search</Button>
          <Button
            variant='outline'
            type='reset'
            onClick={() => {
              form.reset()
              window.location.reload()
            }}
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  )
}
