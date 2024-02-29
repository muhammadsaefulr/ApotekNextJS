"use client"

import { useEffect, useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons"
import { Column, ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

import EditBarang from "./actions/edit-barang"

export type Barang = {
  id: number
  kodeProduk: string
  stok: number
  supplier: string
  kategori: string
  namaBarang: string
}

export const columns: ColumnDef<Barang>[] = [
  {
    accessorKey: "namaBarang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Produk' />
    ),
  },
  {
    accessorKey: "kategori",
    header: () => <h2>Kategori Obat</h2>,
  },
  {
    accessorKey: "supplier",
    header: () => <h2>Supplier Obat</h2>,
  },
  {
    accessorKey: "hargaJual",
    header: ({ column }) => (
      <div className='flex justify-end'>
        <DataTableColumnHeader column={column} title='Harga Jual Obat' />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("hargaJual"))

      return (
        <div className='mr-4 text-right font-medium'>
          Rp. {row.getValue("hargaJual")}
        </div>
      )
    },
  },
  {
    accessorKey: "stok",
    // header: "Amount",
    header: () => (
      <div className='flex justify-end'>
        <h2>Stok Barang</h2>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("stok"))

      return <div className='text-right font-medium'>{amount}</div>
    },
  },
  {
    id: "actions",
    header: () => <div className='text-right'>Action</div>,
    cell: ({ row }) => {
      const { isOpen, openDialog } = useDialogViewBarangStore()
      console.log("isOpen Modal View : ", isOpen)
      const Barang = row.original

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
              <DeleteDialog data={Barang.id} />
              {/* <DropdownMenuItem onClick={() => handleDelete(Barang.id)}>
                Hapus Barang
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => openDialog(Barang.id)}>
                Edit Data
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
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DeleteDialog({
  className,
  children,
  data,
  ...props
}: { data: number } & React.HTMLAttributes<HTMLDivElement>) {

  const [isOpen, setIsopen] = useState(false)
  const { mutate: deleteData } = useDeleteDataProduct()

  const handleDelete = () => {
    deleteData(data)
    setIsopen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsopen} defaultOpen={isOpen}>
      <AlertDialogTrigger onClick={() => setIsopen(true)}>
        <Button variant='ghost' className='p-2'>
          Hapus Produk
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah Kamu Yakin Ingin Menghapus Produk??
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
         <Button onClick={() => handleDelete()}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
