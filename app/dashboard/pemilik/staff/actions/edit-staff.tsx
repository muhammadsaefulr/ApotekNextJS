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
import { useGetStaffById, useUpdateDataStaff } from "@/app/react-query/action"
import { useDialogEditStaffStore } from "@/app/state/store/pagecomponents/dialogTrigger"

export default function EditStaff() {
  const { isOpen, value: valueId, closeDialog } = useDialogEditStaffStore()
  // console.log("data state supplier", valueId)

  const { mutate: idUser, data: valueUser } = useGetStaffById()

  useEffect(() => {
    if (valueId !== null && valueId !== undefined) {
      idUser(valueId)
      console.log("edit supplier id : ", valueId)
    }
  }, [valueId])

  // console.log("value get supplier : ", valueUser)

  useEffect(() => {
      form.reset({
        username: valueUser?.data.username || "",
        email: valueUser?.data.email || "",
        password: valueUser?.data.password || ""
      })
  }, [valueUser])

  const formSchema = z.object({
    email: z.string().email().min(5).max(36),
    username: z.string().min(5).max(50),
    password: z.string().min(1)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const { mutate: onSubmitAPI, isLoading } = useUpdateDataStaff()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesValidation = {  
      email: values.email,
      username: values.username,
    }

    onSubmitAPI({ id: valueId, newObj: valuesValidation })
    console.log("data submit staff: ", valuesValidation)
  }

  const {
    formState: { errors },
  } = form

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogTrigger asChild>
        <a>Edit Staff</a>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className='max-h-96 overflow-y-scroll lg:max-w-screen-lg'>
          <DialogHeader>
            <DialogTitle>Edit Data Staff</DialogTitle>
            <DialogDescription>
              Edit Data Staff Yang Ingin Di Simpan Ke Database
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
                  name='username'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='name' className='text-right'>
                          Username
                        </Label>
                        <FormControl>
                          <Input
                            type='username'
                            placeholder='Masukan Nama Barang'
                            {...field}
                            className={errors.username && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Email User</Label>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Masukan Email'
                            {...field}
                            className={errors.email && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label className='text-right'>Password User</Label>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Masukan Password'
                            {...field}
                            className={errors.password && erStyle}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <Button
                  onClick={() => onSubmit}
                  disabled={isLoading}
                  type='submit'
                >
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
