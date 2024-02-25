import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { SessionProvider } from "next-auth/react"

import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import ReactQueryClientProviders from "@/components/ReactQueryClientProviders/ReactQueryClientProviders"

import Providers from "./provider"

const inter = Inter({ subsets: ["latin"] })
const interl = localFont({ src: "../public/fonts/inter.woff2" })
export const metadata: Metadata = {
  title: "GoPotek",
  description: "Web Management Apotek Sederhana",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ReactQueryClientProviders>
            <div>{children}</div>
          </ReactQueryClientProviders>
          <Toaster />
          <SonnerToaster />
        </Providers>
      </body>
    </html>
  )
}
