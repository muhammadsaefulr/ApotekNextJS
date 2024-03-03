"use client"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column, ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDialogEditStaffStore, useDialogEditSupplierStore } from "@/app/state/store/pagecomponents/dialogTrigger"
import { useDeleteDataSupplier } from "@/app/react-query/action"

export type dataItems = {
  id: number
  kodeProduk: string,
  namaProduk: string,
  idTransaksi: string,
  quantity: number,
  hargaPerProduk: number,
  total: number,
}

export const columns: ColumnDef<dataItems>[] = [
  {
    accessorKey: "namaProduk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Produk' />
    ),
  },
  {
    accessorKey: "idTransaksi",
    header: () => <h2>ID Transaksi</h2>,
  },
  {
    accessorKey: "quantity",
    header: () => <h2>Jumlah Pembelian</h2>,
  },
  {
    accessorKey: "hargaPerProduk",
    header: () => <h2>Harga Produk</h2>,
  },
  {
    accessorKey: "total",
    header: () => (
      <div className='flex justify-end'>
        <h2>Total Harga</h2>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))

      return <div className='text-right font-medium'>Rp {amount}</div>
    },
  },
]

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <CaretSortIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
