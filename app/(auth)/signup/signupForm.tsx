"use client"

import { FormEvent, useState } from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRegisterStaff } from "@/app/react-query/action"

export default function AuthForm() {
  const {
    mutate: submitRegsiterData,
    data: userRegist,
    isLoading,
    isError,
    isSuccess,
  } = useRegisterStaff()
  const router = useRouter()
  const formSchema = z.object({
    username: z
      .string()
      .min(4, { message: "Username must not be less than 4 characters." })
      .max(20, { message: "IUsername cannot be more than 20 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password" }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const registerData = {
      email: values.email,
      password: values.password,
      username: values.username,
    }

    console.log("at data register", registerData)

    submitRegsiterData(registerData)

    if (isSuccess) {
      const signinData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (signinData?.ok) {
        router.replace("/dashboard")
      }
    }
  }

  const {
    formState: { errors },
  } = form

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
                      placeholder='username'
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
            Submit
          </Button>
        </form>
      </Form>
    </>
  )
}
