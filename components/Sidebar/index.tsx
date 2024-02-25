"use client"

import { title } from "process"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import {
  Combine,
  Container,
  FileAxis3D,
  FileBarChart,
  FileBox,
  FormInput,
  GanttChartSquare,
  Home,
  Layers3,
  LibrarySquare,
  LineChart,
  LucideTruck,
  MessageSquarePlus,
  Navigation,
  Package,
  Package2,
  Receipt,
  Table,
  TruckIcon,
  User2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { useSession } from "next-auth/react"

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  href?: string
  icon?: React.ReactNode
  items?: SidebarNavItem[]
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
}

const menu: SidebarNavItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        href: "/dashboard",
        icon: <Home size={16}/>,
      },
    ],
  },
  {
    title: "Barang ",
    items: [
      {
        title: "Produk Obat",
        href: "/dashboard/produk",
        icon: <Package2 size={16} />,
      },
      {
        title: "Supplier",
        href: "/dashboard/supplier",
        icon: <TruckIcon size={16} />,
      },
    ],
  },
  {
    title: "Transaksi",
    items: [
      {
        title: "Buat Transaksi",
        href: "/dashboard/transaksi",
        icon: <Combine size={16} />,
      },
    ],
  },
]

const menuLaporan: SidebarNavItem[] = [
  {
    title: "Fitur Pemilik",
    items: [
      {
        title: "Laporan Penjualan",
        href: "/dashboard/pemilik/laporan",
        icon: <FileBox size={16} />,
      },
      {
        title: "Data Staff",
        href: "/dashboard/pemilik/staff",
        icon: <User2Icon size={16} />,
      },
      {
        title: "Manajemen Supplier",
        href: "/dashboard/pemilik/supplier",
        icon: <LucideTruck size={16} />,
      },
    ],
  },
]


export default function Sidebar({ className, onClick }: SidebarProps) {
  const pathName = usePathname()
  const sessions = useSession()
  const updatedMenu = sessions.data?.user.role === "Pemilik" ? [...menu, ...menuLaporan] : menu;

  return (
    <div className={cn("flex h-full w-[240px] flex-col", className)}>
      <div className='flex h-16 w-full items-center justify-center gap-2 border-b py-3 text-lg font-medium'>
        <Image width={100} height={100} src={"/logo-gopotek.png"} alt='image' />
      </div>
      <div className='py-4'>
      {updatedMenu.map((item, index) => (
          <div key={index} className='px-3 py-2'>
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              {item.title}
            </h2>
            {item.items ? (
              <SidebarItems
                pathName={pathName}
                onClick={onClick}
                items={item.items}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarItems({
  items,
  pathName,
  onClick,
}: {
  onClick?: () => void

  items: SidebarNavItem[]
  pathName: string | null
}) {
  return items.length
    ? items.map((item, index) => (
        <Button
          key={index}
          asChild
          onClick={onClick}
          variant={item.href === pathName ? "secondary" : "ghost"}
          className={cn("mb-1 w-full justify-start", {
            "text-primary": item.href === pathName,
          })}
        >
          {!item.disabled && item.href ? (
            <Link href={item.href}>
              {item.icon && <span className='mr-2'>{item.icon}</span>}
              {item.title}
            </Link>
          ) : (
            <span className='flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60'>
              {item.title}
            </span>
          )}
        </Button>
      ))
    : null
}
