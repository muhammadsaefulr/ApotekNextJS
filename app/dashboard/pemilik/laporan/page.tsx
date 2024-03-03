"use client"

import { useEffect } from "react"
import { CSVLink } from "react-csv"

import { Button } from "@/components/ui/button"
import CardSkeleton from "@/components/CardSkeleton"
import {
  useGetDataTransaksi,
  useGetLaporanPejualan,
  useGetStaffList,
  useGetSupplierProduct,
} from "@/app/react-query/action"

import { columns, dataItems } from "./columns"
import DataTable from "./data-table"
import { PageProduct } from "./produk/page"
import CardBiayaSuplai from "./util/CardBiayaSuplai"
import CardProfit from "./util/CardProfit"
import ChartPenjualan from "./util/ChartPenjualan"

interface Props {}
export default function Page({}: Props) {
  const { data: Transaksi } = useGetDataTransaksi()
  const {
    data: Produk,
    isLoading,
    isError,
    isSuccess,
  } = useGetLaporanPejualan()
  console.log("data transaksi : ", Transaksi)

  const jsonData: dataItems[] = Produk
    ? Produk?.data.map((item) => {
        return {
          id: item.id,
          idTransaksi: item.idTransaksi,
          namaProduk: item.namaProduk,
          kodeProduk: item.kodeBarang,
          hargaPerProduk: item.hargaPerProduk,
          quantity: item.quantity,
          total: item.total,
        }
      })
    : []

  if (isLoading) {
    return <CardSkeleton />
  } else {
    return (
      <div className=''>
        <div className='xl:flex justify-around md: block'>
          <CardBiayaSuplai data={Produk?.hpp} />
          <CardProfit data={Produk?.labaBersih} />
        </div>
        <div className="pt-6">
          <DataTable columns={columns} data={jsonData} />
        </div>
        <div className=''>
          <PageProduct />
        </div>

        <div className='p-2 pt-8'>
          <p className='font-bold uppercase pb-4'>Statistik Penjualan Produk</p>
          <ChartPenjualan data={Transaksi?.data} />
        </div>
      </div>
    )
  }
}
