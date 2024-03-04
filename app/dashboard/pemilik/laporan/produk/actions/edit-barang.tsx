"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useAddProduct,
  useGetKategoriProduct,
  useGetProductById,
  useGetSupplierProduct,
  useUpdateDataProduct,
} from "@/app/react-query/action"
import { useDialogViewBarangStore } from "@/app/state/store/pagecomponents/dialogTrigger"

export default function EditBarang() {
  const { isOpen, value: valueId, closeDialog } = useDialogViewBarangStore()

  const { mutate: idProd, data: valueProduct } = useGetProductById()

  const extractDate = (isoDateString: string): string | null => {
    const regex = /^(\d{4}-\d{2}-\d{2})/;
    const match = isoDateString.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    form.reset({
      namaBarang: valueProduct?.data?.namaBarang || '',
      kodeProduk: valueProduct?.data?.kodeProduk || '',
      detilBarang: valueProduct?.data?.detilBarang || '',
      idRakBarang: valueProduct?.data?.idRakBarang.toString() || '',
      hargaAwal: valueProduct?.data?.hargaAwal || null,
      biayaSuplai: valueProduct?.data?.hargaAwal || null,
      hargaJual: valueProduct?.data.hargaJual || null,
      stok: valueProduct?.data?.stok || null,
      tglDitambahkan: extractDate(valueProduct?.data?.tanggalMasuk || '')
    })
  }, [valueProduct])

  useEffect(() => {
    if (valueId !== null && valueId !== undefined) {
      idProd(valueId)
    }
  }, [valueId])

  const formSchema = z.object({
    kodeProduk: z.string().min(9).max(9),
    namaBarang: z.string().min(1),
    detilBarang: z.string().max(90),
    stok: z.coerce.number().or(z.literal("")),
    biayaSuplai: z.coerce.number().or(z.literal("")),
    hargaAwal: z.coerce.number().or(z.literal("")),
    hargaJual: z.coerce.number().or(z.literal("")),
    idRakBarang: z.string(),
    tglDitambahkan: z.coerce.string().or(z.literal(''))
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const { mutate: onSubmitAPI, isLoading } = useUpdateDataProduct()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesValidation = {
      kodeProduk: values.kodeProduk,
      namaBarang: values.namaBarang,
      detilBarang: values.detilBarang,
      stok: 90,
      hargaAwal: values.hargaAwal,
      hargaJual: values.hargaJual,
      idRakBarang: parseInt(values.idRakBarang),
      nomorRak: parseInt(values.idRakBarang),
      biayaSuplai: values.biayaSuplai
    }

    onSubmitAPI({ id: valueId, newObj: valuesValidation })
    console.log("data submit : ", valuesValidation)
  }

  const {
    formState: { errors },
  } = form

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <a>Edit Barang</a>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className='max-h-96 overflow-y-scroll lg:max-w-screen-lg'>
          <DialogHeader>
            <DialogTitle>Edit Data Barang</DialogTitle>
            <DialogDescription>
              Edit Barang Yang Ingin Di Simpan Ke Database
            </DialogDescription>
          </DialogHeader>
          <div className='container mx-auto mt-2 grid'>
            <div className='lg:grid-row-3 grid-cols-1 pb-2 lg:grid'>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-3'
              >
                <FormField
                  control={form.control}
                  name='namaBarang'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='name' className='text-right'>
                          Nama Barang
                        </Label>
                        <FormControl>
                          <Input
                            type='namaBarang'
                            placeholder='Masukan Nama Barang'
                            {...field}
                            className={errors.namaBarang && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='kodeProduk'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Kode Produk</Label>
                        <FormControl>
                          <Input
                            type='kodeProduk'
                            placeholder='Masukan Kode Produk (Opsional)'
                            {...field}
                            className={errors.kodeProduk && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='detilBarang'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Detil Barang</Label>
                        <FormControl>
                          <Input
                            type='namaBarang'
                            placeholder='Masukan Deskripsi Detil Barang'
                            {...field}
                            className={errors.detilBarang && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='stok'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Stok Barang</Label>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Masukan Jumlah Stok Barang'
                            {...field}
                            className={errors.stok && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='hargaAwal'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Harga Awal Barang</Label>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Masukan Harga Awal Barang'
                            {...field}
                            className={errors.hargaAwal && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='biayaSuplai'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Biaya ReStock Produk</Label>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Masukan Biaya Suplai Atau Restock Produk '
                            {...field}
                            className={errors.biayaSuplai && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='hargaJual'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Harga Jual Barang</Label>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Masukan Harga Jual Barang'
                            {...field}
                            className={errors.hargaJual && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='idRakBarang'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Nomor Rak Barang</Label>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Masukan Nomor Rak Dimana Barang Berada'
                            {...field}
                            className={errors.idRakBarang && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='tglDitambahkan'
                  disabled={true}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Tanggal Di Tambahkan</Label>
                        <FormControl>
                          <Input
                            disabled={true}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button onClick={() => onSubmit} disabled={isLoading} type='submit'>
                  {isLoading && (
                    <Loader2 className='mr-2 animate-spin' size={16} />
                  )}
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
