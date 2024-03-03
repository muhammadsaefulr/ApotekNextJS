"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { literal, z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

export default function Component() {
  const { setValue } = useForm()

  const { data: session, status } = useSession()

  const [userfetch, setUserFetch] = useState<{ username?: string; email?: string; password?: string }>({})

  const { mutate: updateData } = useUpdateDataStaff()

  let userId: any
  console.log(session?.user.id)

  useEffect(() => {
    userId = session?.user.id ?? ""

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/${userId}`,
      )
      const resp = await response.json()
      const validate = (resp.data)
      setUserFetch({username: validate.username, email: validate.email})

      form.reset({
        username: validate.username,
        email: validate.email
      })
    }

    fetchData()
  }, [session])

  const formSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const {
    formState: { errors },
  } = form

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("On Submit : ", values)

    const validationSubmit = {
      username: values.username,
      email: values.email,
    }

    updateData({ id: parseInt(userId), newObj: validationSubmit })
  }

  // console.log(form.getValues("username"))
  // console.log(form.getValues("username") !== undefined ? false : true)
  
  return (
    <div className='mx-auto flex justify-center'>
      <Card className='max-w-8xl w-full'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Profile</CardTitle>
          <CardDescription className='font-semibold text-white'>
            Update Data Profile, Data Yang di update akan dimasukan ke database
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-3'
          >
            <CardContent>
              <div className='space-y-2 pt-2'>
                <FormField
                  control={form.control}
                  name='username'
                  disabled={form.getValues("username") !== undefined ? false : true}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='name' className='w-full'>
                          Username
                        </Label>
                        <FormControl>
                          <Input
                            type='username'
                            disabled={field.value === null ? false : true}
                            placeholder='Masukan Username'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className='space-y-2 pt-2'>
                <FormField
                  control={form.control}
                  name='email'
                  disabled={form.getValues("username") !== undefined ? false : true}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='email' className='w-full'>
                          Email
                        </Label>
                        <FormControl>
                          <Input
                            disabled={field.value === null ? false : true}
                            type='email'
                            placeholder='Masukan Email'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              {/* <div className='space-y-2 pt-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label htmlFor='password' className='w-full'>
                          Password
                        </Label>
                        <FormControl>
                          <Input
                            type='password'
                            placeholder='Masukan Password'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div> */}
            </CardContent>
            <CardFooter className='flex space-x-2'>
              <Button className='flex-1' variant='outline'>
                Cancel
              </Button>
              <Button className='flex-1'>Save</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div className=''></div>
    </div>
  )
}
