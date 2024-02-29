"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRegisterStaff } from "@/app/react-query/action"
import { AlertDialogAction } from "@radix-ui/react-alert-dialog"

export default function SignUpForm() {
  const router = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const formSchema = z.object({
    username: z
      .string()
      .min(4, { message: "Username must not be less than 4 characters." })
      .max(20, { message: "IUsername cannot be more than 20 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password." }),
    roleId: z.number().min(1),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "saepulid",
      email: "epulid@gmail.com",
      password: "admin123",
      roleId: 1,
    },
  })

  const {
    mutate: onSubmitAPI,
    data,
    isLoading,
    isSuccess,
    isError,
  } = useRegisterStaff()

  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    const valuesValidation = {
      username: values.username,
      email: values.email,
      password: values.password,
      roleId: values.roleId,
    }

    onSubmitAPI(valuesValidation)

    if (isError) {
      setDialogOpen(true)
    }

    if (isSuccess) {
      const loggedIn = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (loggedIn?.ok) {
        router.replace("/dashboard")
      } else {
        setDialogOpen(true)
      }
    }
  }

  const { errors } = form.formState
  console.log("tes isOpenDialog : ", isDialogOpen, "where data: ", data)

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='usename'
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
                  <FormControl>
                    <Input
                      placeholder='name@example.com'
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
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='password'
                    type='password'
                    {...field}
                    className={errors.password && erStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 animate-spin' size={16} />}
            Continue
          </Button>
        </form>
      </Form>

      {isDialogOpen && (
        <AlertDialog open={isDialogOpen} defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogDescription>
              <div>
                <ExclamationTriangleIcon fontSize={540}/>
                <p className="">{data?.message}</p>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={() => router.replace("/login")}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
