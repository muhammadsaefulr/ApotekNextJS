"use client"

import { useEffect } from "react"
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
import { useDeleteDataProduct } from "@/app/react-query/action"
import { useDialogViewBarangStore } from "@/app/state/store/pagecomponents/dialogTrigger"

export type Barang = {
  id: number
  kodeProduk: string
  quantity: number
  hargaPerPcs: number,
  total: number,
  namaProduk: string,
  namaSupplier: string
}

export const columns: ColumnDef<Barang>[] = [
  {
    accessorKey: "namaProduk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Produk' />
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <h2>Jumlah Pembelian</h2>,
  },
  {
    accessorKey: "namaSupplier",
    header: () => <h2>Supplier Obat</h2>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <div className='flex justify-end'>
        <DataTableColumnHeader column={column} title='Harga Jual Obat' />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className='mr-4 text-right font-medium'>
          Rp. {row.getValue("total")}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className='text-right'>Action</div>,
    cell: ({ row }) => {
      const {isOpen, openDialog } = useDialogViewBarangStore()
      // console.log("isOpen Modal View : ", isOpen)
      const Barang = row.original

      const { mutate: deleteData } = useDeleteDataProduct()

      const handleDelete = (id: number) => {
        deleteData(id)
      }

      return (
        <div className='text-right'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(Barang.kodeProduk)}
              >
                Copy Barang ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
