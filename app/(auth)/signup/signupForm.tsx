"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const formSchema = z.object({
    username: z
      .string()
      .min(4, { message: "Username must not be less than 4 characters." })
      .max(20, { message: "IUsername cannot be more than 20 characters" }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password." }),
    roleId: z.number().min(1)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "saepulid",
      email: "epulid@gmail.com",
      password: "admin123",
      roleId: 1
    },
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setLoading(true)

    await axios.post("/api/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password,
      roleId: values.roleId
    }).then(function (response){
      alert(response.data?.message)
    }).catch(function (error){
      console.log(error)
    })

    const loggedIn = await signIn("credentials", {
      email: values.email,
      password: values.password
    })

    router.replace("/dashboard")
   
    setTimeout(() => {
      setLoading(false)
    }, 3000)

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
          <Button type='submit' className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 animate-spin' size={16} />}
            Continue
          </Button>
        </form>
      </Form>
    </>
  )
}
