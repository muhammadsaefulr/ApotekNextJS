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
    <main>
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
              <Link href='/'>Documentation</Link>
              <Link href='/'>Components</Link>
              <Link href='/'>Themes</Link>
              <Link href='/'>Examples</Link>
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

      <div className='container'>
        <PageHeader className='pb-8'>
          <PageHeaderHeading>
            Halo, Selamat Datang Di Website GoApotek
          </PageHeaderHeading>
          <PageHeaderDescription>
            Silahkan Login Atau Register Untuk Memulai
          </PageHeaderDescription>
          <div className='flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10'>
            <Link href='/dashboard' className={cn(buttonVariants())}>
              Get Started
            </Link>
            <Link
              target='_blank'
              rel='noreferrer'
              href='https://github.com/muhammadsaefulr/inventori-gudang'
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              GitHub
            </Link>
          </div>
        </PageHeader>
      </div>

      <footer className='py-6 md:px-8 md:py-0'>
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
        "text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
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
        "max-w-[750px] text-lg text-muted-foreground sm:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
