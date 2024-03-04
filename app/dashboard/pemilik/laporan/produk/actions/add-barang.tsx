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
  useGetSupplierProduct,
} from "@/app/react-query/action"

export default function AddBarang() {
  useGetKategoriProduct()
  const { data: Supplier } = useGetSupplierProduct()
  const { data: kategori } = useGetKategoriProduct()
  console.log("Data S: ",Supplier)
  const [loading, setLoading] = useState(false)
  const [dialogStatus, setDialogStatus] = useState<boolean | undefined>(
    undefined,
  )

  const formSchema = z.object({
    kodeProduk: z.string().optional(),
    namaBarang: z.string().min(1),
    detilBarang: z.string().max(90),
    stok: z.coerce.number().or(z.literal("")),
    biayaSuplai: z.coerce.number().or(z.literal("")),
    hargaAwal: z.coerce.number().or(z.literal("")),
    hargaJual: z.coerce.number().or(z.literal("")),
    tglKadaluarsa: z.date({
      required_error: "Masukan Tanggal Kadaluarsa Produk",
    }),
    idSupplier: z.string(),
    idRakBarang: z.string(),
    idKategori: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kodeProduk: "AB90POP9W",
      namaBarang: "OBH COMBI",
      detilBarang: "Obat Flu Dan Batuk",
      stok: 90,
      hargaAwal: 28000,
      hargaJual: 32000,
      biayaSuplai: 489000,
    },
  })

  const { mutate: onSubmitAPI } = useAddProduct()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesValidation = {
      kodeProduk: values.kodeProduk,
      namaBarang: values.namaBarang.toUpperCase(),
      detilBarang: values.detilBarang,
      stok: values.stok,
      biayaSuplai: values.biayaSuplai,
      hargaAwal: values.hargaAwal,
      hargaJual: values.hargaJual,
      tglKadaluarsa: values.tglKadaluarsa,
      idSupplier: parseInt(values.idSupplier),
      idRakBarang: parseInt(values.idRakBarang),
      nomorRak: parseInt(values.idRakBarang),
      idKategori: parseInt(values.idKategori)
    }

    onSubmitAPI(valuesValidation)
    console.log("data : ", valuesValidation)
    setDialogStatus(false)
  }

  const {
    formState: { errors },
  } = form

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <Dialog open={dialogStatus}>
      <DialogTrigger asChild>
        <Button variant='outline'>Tambah Barang</Button>
      </DialogTrigger>
      <DialogContent className='max-h-96 overflow-y-scroll lg:max-w-screen-lg'>
        <DialogHeader>
          <DialogTitle>Tambah Barang</DialogTitle>
          <DialogDescription>
            Tambah Barang Yang Ingin Di Simpan Ke Database
          </DialogDescription>
        </DialogHeader>
        <div className='container mx-auto mt-2 grid'>
          <div className='lg:grid-row-3 grid-cols-1 pb-2 lg:grid'>
            <Form {...form}>
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
                            type='namaBarang'
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
                            type='stok'
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
                  name='hargaAwal'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Harga Awal Barang</Label>
                        <FormControl>
                          <Input
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
                  name='hargaJual'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Harga Jual Barang</Label>
                        <FormControl>
                          <Input
                            placeholder='Masukan Harga Awal Barang'
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
                        <Label className='text-right'>No Rak Barang</Label>
                        <FormControl>
                          <Input
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
                  name='tglKadaluarsa'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>
                          Tgl Kadaluarsa Produk
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih Tanggal Kadaluarsa</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                              <Calendar
                                mode='single'
                                captionLayout='dropdown-buttons'
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='idKategori'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>
                          Pilih Kategori Obat
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.name}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Pilih Kategori Obat' />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='idSupplier'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>
                          Pilih Asal Supplier Barang
                        </Label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.name}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Pilih Supplier' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Supplier?.data?.map((item: any) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.namaSupplier}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button type='submit' disabled={loading}>
                  {loading && (
                    <Loader2 className='mr-2 animate-spin' size={16} />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
