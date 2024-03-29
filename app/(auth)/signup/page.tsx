import Link from "next/link"
import { LibrarySquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { redirect } from "next/navigation"

import SignUpForm from "./signupForm"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { AuthOptions } from "@/lib/auth"


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
          href='/login'
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
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
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Create an account
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email below to create your account
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <SignUpForm />
            </div>
            <p className='px-8 text-center text-sm text-muted-foreground'>
              Silahkan Daftar Akun Terlebih Dahulu, Sudah Punya Akun?{" "}
              <Link
                href='/login'
                className='underline underline-offset-4 hover:text-primary'
              >Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
