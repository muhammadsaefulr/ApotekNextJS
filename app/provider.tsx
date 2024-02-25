"use client"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
interface Props {
  children: React.ReactNode
}
export default function Providers({ children }: Props) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SessionProvider>
      {children}
      </SessionProvider>
    </ThemeProvider>
  )
}
