"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cookies } from 'next/headers'

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

export default function AuthForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password" }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/profile"

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    const signinData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })

    console.log("at data signin",signinData)

    if(signinData?.error){
      alert("Password atau user yang dimasukan salah !")
    }

    router.replace("/dashboard")
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
          <Button type='submit' className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 animate-spin' size={16} />}
            Submit
          </Button>
          {/* <FormItem className='text-sm'>
            <label htmlFor='remember' className='flex items-center font-normal'>
              <Checkbox className='mr-2' id='remember' /> Remember this device.
            </label>
          </FormItem> */}
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Login Untuk Melanjutkan
          </span>
        </div>
      </div>
    </>
  )
}
