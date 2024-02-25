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
  useAddSupplier,
  useGetKategoriProduct,
  useGetSupplierProduct,
} from "@/app/react-query/action"

export default function AddSupplier() {
  useGetKategoriProduct()
  const { data: Supplier } = useGetSupplierProduct()
  const { data: kategori } = useGetKategoriProduct()
  console.log("Data S: ",Supplier)
  const [loading, setLoading] = useState(false)
  const [dialogStatus, setDialogStatus] = useState<boolean | undefined>(
    undefined,
  )

  const formSchema = z.object({
    namaSupplier: z.string().min(1),
    emailSupplier: z.string().min(1).email(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { mutate: onSubmitAPI } = useAddSupplier()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesValidation = {
      namaSupplier: values.namaSupplier,
      emailSupplier: values.emailSupplier,
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
        <Button variant='outline'>Tambah Supplier</Button>
      </DialogTrigger>
      <DialogContent className='max-h-96 overflow-y-scroll lg:max-w-screen-lg'>
        <DialogHeader>
          <DialogTitle>Tambah Data Supplier</DialogTitle>
          <DialogDescription>
            Tambah Data Supplier Yang Ingin Di Simpan Ke Database
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
                  name='namaSupplier'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='name' className='text-right'>
                          Nama Supplier
                        </Label>
                        <FormControl>
                          <Input
                            type='namaSupplier'
                            placeholder='Masukan Nama Barang'
                            {...field}
                            className={errors.namaSupplier && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='emailSupplier'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Email Supplier</Label>
                        <FormControl>
                          <Input
                            type='namaSupplier'
                            placeholder='Masukan Email Supplier'
                            {...field}
                            className={errors.emailSupplier && erStyle}
                          />
                        </FormControl>
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
