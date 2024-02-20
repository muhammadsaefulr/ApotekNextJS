import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LibrarySquare } from "lucide-react"
import { getServerSession } from "next-auth"

import { AuthOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import AuthForm from "./authForm"

export default async function Page() {
  const session = await getServerSession(AuthOptions)
  if (session?.user) {
    redirect("/dashboard")
  }
  return (
    <>
      <div
        className='container relative grid h-screen min-w-[320px] flex-col items-center
          justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'
      >
        <Link
          href='/signup'
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 hidden md:right-8 md:top-8",
          )}
        >
          Sign Up
        </Link>
        <div className='relative hidden h-full flex-col bg-muted p-8 text-white lg:flex dark:border-r'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 pb-12' />
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <Image
              width={100}
              height={100}
              src={"/logo-gopotek.png"}
              alt='image'
            />
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center md:pt-20 lg:pt-10'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below to log in
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
