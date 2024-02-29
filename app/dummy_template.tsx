import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { LibrarySquare, PartyPopper, Twitter } from "lucide-react"
import { getServerSession } from "next-auth"

import { AuthOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default async function Home() {
  return (
    <main className='overflow-x-hidden'>
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-14 items-center justify-between'>
          <div className='mr-4 hidden md:flex'>
            <Link href='/' className='mr-6 flex items-center space-x-2'>
              <Image
                width={100}
                height={100}
                src={"/logo-gopotek.png"}
                alt='image'
              />
            </Link>
            <nav className='flex items-center space-x-6 text-sm font-medium'>
              <Link href='/'>Fitur</Link>
              <Link href='/'>Kontak</Link>
              <Link href='/'>About</Link>
            </nav>
          </div>

          <nav className='flex items-center gap-4'>
            <Link
              href='/login'
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Login
            </Link>
            <Link
              href='/signup'
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Signup
            </Link>
          </nav>
        </div>
      </header>

      <div className='py-4' />

      <div className='container flex justify-around py-12'>
        <div className='pt-12'>
          <PageHeader>
            <PageHeaderHeading>Mudahkan Memantau Apotekmu</PageHeaderHeading>
            <PageHeaderDescription>
              Pantau Retail Apotek Mu Secara Mudah Dan Sederhana Dengan GoPotek
            </PageHeaderDescription>
            <div className='flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10'>
              <Link href='/dashboard' className={cn(buttonVariants())}>
                Get Started
              </Link>
            </div>
          </PageHeader>
        </div>
        <div className='mr-12 pb-8'>
          <img width={350} height={110} src='/assets/apotek-vector.png' />
        </div>
      </div>

      <div className='py-8' />

      <div className='container ms-12 flex justify-around py-12'>
        <div className='pb-6'>
          <Image
            src='/assets/preview-laptop.png'
            width={350}
            height={110}
            alt='none'
          />
        </div>

        <div className='ml-[10%] mt-5 pt-2'>
          <div className='ml-[20%]'>
            <p className='font-bold uppercase text-blue-500'>TENTANG KAMI</p>
            <h1 className='w-[80%] text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1]'>
              Platform Webiste Sederhana
            </h1>
            <div className='inline-block w-[80%] pt-2'>
              <h1 className='text-1xl'>
                Jelajahi kemudahan dan kenyamanan dalam memantau apotek Anda
                dengan GoPotek!
              </h1>
              <h1 className='text-1xl w-[80%] pt-2'>
                Anda dapat mengelola retail apotek secara efisien dan sederhana
                Dengan antarmuka yang ramah pengguna.
              </h1>
            </div>
          </div>
        </div>
      </div>

      <footer className='py-6 md:px-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
            Built by{" "}
            <a
              href={"https://nextjs.org/"}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              NextJS 13
            </a>
            . For More Information Please Contact At{" "}
            <a
              href='https://wa.me/6288219406742'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              Whatsapp
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  )
}
function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "flex max-w-[980px] flex-col items-start gap-2 px-4 pt-8 md:pt-12",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-1xl w-[90%] font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      className={cn(
        "max-w-[60%] text-lg text-muted-foreground sm:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
