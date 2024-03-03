"use client"

import { JSX, SVGProps, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Component() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])
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
              href='#about'
            >
              About
            </Link>
            <Link
              className='pt-2 text-sm font-medium underline-offset-4 hover:underline'
              href='#fitur'
            >
              Features
            </Link>
            <Link
              className='pt-2 text-sm font-medium underline-offset-4 hover:underline'
              href='#contact'
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
        <main className='flex-1' id='about'>
          <section className='w-full pb-32 pt-12 md:pt-24 lg:pt-32'>
            <div className='space-y-10 px-4 md:px-6 xl:space-y-16'>
              <div className='mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10'>
                <div className='flex flex-col items-start space-y-4'>
                  <h1 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                    Mudahkan Memantau Apotekmu
                  </h1>
                  <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Maksimalkan Efisiensi Manajemen Apotek Anda dengan GoPotek -
                    Platform Website Modern yang Memudahkan Pemantauan Stok Dan
                    Penjualan.
                  </p>
                  <div className='space-x-4'>
                    <Link
                      className='inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                      href='/dashboard'
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
                <div className='flex flex-col items-end space-y-4'>
                  <img
                    width={350}
                    height={110}
                    src='/assets/apotek-vector.png'
                  />
                </div>
              </div>
            </div>
          </section>
          <section className='w-full py-12 md:py-24 lg:py-32' id='fitur'>
            <div className='container space-y-12 px-4 md:px-6'>
              <div className='flex flex-col items-center justify-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                    New Features
                  </div>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                    Lebih Simple, Lebih Nyaman
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
                          Kami Menggunakan NextJS Sebagai Base Dari website
                          kami, Memastikan kinerja server tetap ringan, stabil,
                          dan harga tetap terjangkau.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className='grid gap-1'>
                        <h3 className='text-xl font-bold'>Multi Role User</h3>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Akses Pemilik untuk Semua Halaman!, Hanya anda
                          (Pemilik) yang tahu detail dari apotek anda, Staff
                          Mencatat Transaksi Dengan Mudah
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
                <h2 className='px-1 text-3xl font-bold tracking-tighter md:text-4xl/tight lg:px-4'>
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
                  href='/dashboard'
                >
                  Get Started
                </Link>
                <Link href='http://wa.me/6288219406742'>
                  <Button className='h-10 px-8 text-sm text-white'>
                    Contact CS
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          <section
            className='w-full border-t py-12 md:py-24 lg:py-32'
            id='contact'
          >
            <div className='container px-4 md:px-6'>
              <div className='grid gap-10 px-10 md:gap-16 lg:grid-cols-2'>
                <div className='space-y-4'>
                  <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                    <p>Dukungan Teknis</p>
                  </div>
                  <h2 className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]'>
                    Punya Pertanyaan Lebih tentang GoPoteK?
                  </h2>
                </div>
                <div className='mt-6 flex flex-col items-start space-y-8'>
                  <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'>
                    Kami Memiliki customer service yang bisa membantu anda jika
                    anda memiliki kendala dengan produk kami, silahkan klik link
                    di bawah untuk memulai berkonsultasi ~~
                  </p>
                  <Link
                    className='disabled:pointer-events_none inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                    href='http://wa.me/6288219406742'
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            © 2024 PT Digital Solusindo Indonesia. All rights reserved.
          </p>
          <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
            <Link
              className='text-xs underline-offset-4 hover:underline'
              href='#'
            >
              Terms of Service
            </Link>
            <Link
              className='text-xs underline-offset-4 hover:underline'
              href='#'
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
  )
}
