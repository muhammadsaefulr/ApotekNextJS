/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xwjFCAuk4Xp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { JSX, SVGProps } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Component() {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <header className='flex h-14 items-center px-4 lg:px-6'>
        <Link className='flex items-center justify-center' href='#'>
          <Image
            width={120}
            height={120}
            src={"/logo-gopotek.png"}
            alt='image'
          />
        </Link>
        <nav className='ml-auto flex gap-4 pt-3 sm:gap-6'>
          <Link
            className='pt-2 text-sm font-medium underline-offset-4 hover:underline'
            href='#'
          >
            Features
          </Link>
          <Link
            className='pt-2 text-sm font-medium underline-offset-4 hover:underline'
            href='#'
          >
            About
          </Link>
          <Link
            className='pt-2 text-sm font-medium underline-offset-4 hover:underline'
            href='#'
          >
            Contact
          </Link>
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
      </header>
      <main className='flex-1'>
        <section className='w-full pb-32 pt-12 md:pt-24 lg:pt-32'>
          <div className='space-y-10 px-4 md:px-6 xl:space-y-16'>
            <div className='mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10'>
              <div className='flex flex-col items-start space-y-4'>
                <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                  Mudahkan Memantau Apotekmu
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Maksimalkan Efisiensi Manajemen Apotek Anda dengan GoPotek -
                  Platform Website Modern yang Memudahkan Pemantauan Stok,
                  Penjualan, dan Pengelolaan Karyawan!{" "}
                </p>
                <div className='space-x-4'>
                  <Link
                    className='inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                    href='#'
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className='flex flex-col items-end space-y-4'>
                <img width={350} height={110} src='/assets/apotek-vector.png' />
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container space-y-12 px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                  New Features
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Lebih Simple, Lebih Baik
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Dengan GoPotek, pengelolaan apotek Anda akan menjadi lebih
                  sederhana dan mudah. Platform ini menyediakan antarmuka
                  pengguna yang minimalis dan harga yang terjangkau.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              <img
                alt='Image'
                className='mx-auto overflow-hidden rounded-xl object-center lg:order-last'
                height='400'
                src='/assets/preview-laptop.png'
                width='400'
              />
              <div className='flex flex-col justify-center space-y-4'>
                <ul className='grid gap-6'>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>Modern Simple UI</h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Buat kegiatan manajemen apotekmu lebih efisien dengan
                        antarmuka website yang sederhana
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>Biaya Lebih Murah</h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Kami Menggunakan NextJS Sebagai Base Dari website kami,
                        Memastikan kinerja server tetap ringan, stabil, dan
                        harga tetap terjangkau.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>Multi Role User</h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Akses Pemilik untuk Semua Halaman!, Hanya anda (Pemilik)
                        yang tahu detail dari apotek anda, Staff Mencatat
                        Transaksi Dengan Mudah
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800'>
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-2'>
              <h2 className='px-4 text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                Ingin mencoba GoPotek?
              </h2>
              <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Jika anda tertarik dengan gopotek anda bisa kontak kami untuk
                detail lebih lanjut, atau anda bisa langsung memulai dengan
                mendaftar !
              </p>
            </div>
            <div className='flex space-x-4 lg:justify-end'>
              <Link
                className='disabled:pointer-events_none inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                href='#'
              >
                Get Started
              </Link>
              <Link href='#'>
                <Button className="px-8 text-sm h-10 text-white">Contact CS</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10'>
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                Meet our Team
              </h2>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Berkenalan Dengan Dengan Tim Pendiri Kami
              </p>
            </div>
            <div className='divide-y rounded-lg border'>
              <div className='grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3'>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
              </div>
              <div className='grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3'>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <img
                    alt='Logo'
                    className='aspect-[2/1] overflow-hidden rounded-lg object-contain object-center'
                    height='70'
                    src='/placeholder.svg'
                    width='140'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full border-t py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-10 px-10 md:gap-16 lg:grid-cols-2'>
              <div className='space-y-4'>
                <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                  Performance
                </div>
                <h2 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                  Traffic spikes should be exciting, not scary.
                </h2>
                <Link
                  className='disabled:pointer-events_none inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                  href='#'
                >
                  Get Started
                </Link>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                  Security
                </div>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
                  Fully managed infrastructure designed to scale dynamically
                  with your traffic, a global edge to ensure your site is fast
                  for every customer, and the tools to monitor every aspect of
                  your app.
                </p>
                <Link
                  className='disabled:pointer-events_none inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-900 dark:focus-visible:ring-gray-300'
                  href='#'
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs underline-offset-4 hover:underline' href='#'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  )
}
