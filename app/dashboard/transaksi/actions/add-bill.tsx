"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { literal, z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import {
  useAddSupplier,
  useGetKategoriProduct,
  useGetProduct,
  useGetSupplierProduct,
} from "@/app/react-query/action"
import { setDataBarangTransaksi } from "@/app/state/store/transaksi/store"

export default function AddBill() {
  useGetKategoriProduct()
  const { data: Barang } = useGetProduct()
  const { data: Supplier } = useGetSupplierProduct()
  const { dataBarang, setDataBarang } = setDataBarangTransaksi()

  const formSchema = z.object({
    idBarang: z.number().or(z.literal("")),
    idSupplier: z.number().or(z.literal("")),
    namaSupplier: z.string().default("null"),
    namaBarang: z.string({
      required_error: "Mohon Isi Nama Barang",
    }),
    quantity: z.coerce.number().or(z.literal("")),
    tglTransaksi: z.string().nullable().optional(),
    hargaJual: z.coerce.number().or(z.literal("")).optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tglTransaksi: "",
    },
  })

  const { mutate: onSubmitAPI } = useAddSupplier()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const qty: number = parseInt(values.quantity.toString())

    const dataProduk = Barang?.data.find((data) => data.id === values.idBarang)
    
    const valuesValidation = [
      {
        id: values.idBarang,
        kodeProduk: dataProduk?.kodeProduk,        
        idSupplier: values.idSupplier,
        namaSupplier: dataProduk?.supplier,
        hargaPerPcs: dataProduk?.hargaJual,
        quantity: values.quantity,
        namaBarang: values.namaBarang,
        total: dataProduk?.hargaJual * qty,
      },
    ]

    onSubmitAPI(valuesValidation)
    setDataBarang(valuesValidation)
    console.log("data : ", valuesValidation)
  }

  const {
    formState: { errors },
  } = form

  console.log("data state transaksi : ", dataBarang)

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <div className='mx-auto grid'>
      <div className='grid-cols-6 grid-rows-3 gap-2'>
        <Form {...form}>
          <form
            id='addbills-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-3'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='namaBarang'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='pt-2'>Pilih Barang</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? Barang?.data?.find(
                                  (data) => data.namaBarang === field.value,
                                )?.namaBarang
                              : "Pilih Barang"}
                            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-[200px] p-0'>
                        <Command>
                          <CommandInput
                            placeholder='Cari Barang...'
                            className='h-9'
                          />
                          <CommandEmpty>No data found.</CommandEmpty>
                          <CommandGroup>
                            {Barang?.data?.map((product: any) => (
                              <CommandItem
                                value={product.namaBarang}
                                key={product.id}
                                onSelect={() => {
                                  form.setValue(
                                    "namaBarang",
                                    product.namaBarang,
                                  )
                                  form.setValue("idBarang", product.id)
                                  form.setValue("idSupplier", product.idSupplier)
                                  form.setValue("namaSupplier", product.supplier)
                                  form.setValue("hargaJual", product.hargaJual)
                                  form.setValue("idSupplier", product.idSupplier)
                                }}
                              >
                                {product.namaBarang}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    product.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => {
                  return (
                    <FormItem className=''>
                      <Label className='text-right'>Jumlah Barang</Label>
                      <FormControl>
                        <Input
                          type='quantity'
                          placeholder='Masukan Jumlah Barang'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                disabled={true}
                control={form.control}
                name='namaSupplier'
                render={({ field }) => {
                  return (
                    <FormItem className=''>
                      <Label className='text-right'>Supplier Barang</Label>
                      <FormControl>
                        <Input type='namaSupplier' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                disabled={true}
                name='hargaJual'
                render={({ field }) => {
                  return (
                    <FormItem className=''>
                      <Label className='text-right'>Harga Per Obat</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
