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
  useGetSupplierProductById,
  useUpdateDataProduct,
  useUpdateDataSupplier,
} from "@/app/react-query/action"
import { useDialogEditSupplierStore, useDialogViewBarangStore } from "@/app/state/store/pagecomponents/dialogTrigger"

export default function EditSupplier() {
  const { isOpen, value: valueId, closeDialog } = useDialogEditSupplierStore()

  const { mutate: idSupplier, data: valueSupplier } = useGetSupplierProductById()

  useEffect(() => {
      if (valueId !== null && valueId !== undefined) {
          idSupplier(valueId)
          console.log("edit supplier id : ", valueId)
        }
    }, [valueId])

    
    useEffect(() => {
      // console.log("value get supplier : ", valueSupplier)
      form.reset({
        namaSupplier: valueSupplier?.data?.namaSupplier,
        emailSupplier: valueSupplier?.data?.emailSupplier,
      })
    }, [valueSupplier])


  const formSchema = z.object({
    emailSupplier: z.string().email(),
    namaSupplier: z.string().min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const { mutate: onSubmitAPI, isLoading } = useUpdateDataSupplier()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesValidation = {
      emailSupplier: values.emailSupplier,
      namaSupplier: values.namaSupplier,
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
        <a>Edit Supplier</a>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className='max-h-96 overflow-y-scroll lg:max-w-screen-lg'>
          <DialogHeader>
            <DialogTitle>Edit Data Supplier</DialogTitle>
            <DialogDescription>
              Edit Data Supplier Yang Ingin Di Simpan Ke Database
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
                            placeholder='Masukan email supplier'
                            {...field}
                            className={errors.emailSupplier && erStyle}
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
