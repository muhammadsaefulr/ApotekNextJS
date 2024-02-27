"use client"

import { useEffect } from "react"

import CardSkeleton from "@/components/CardSkeleton"
import {
  useGetDataTransaksi,
  useGetLaporanPejualan,
  useGetStaffList,
  useGetSupplierProduct,
} from "@/app/react-query/action"

import { columns, dataItems } from "./columns"
import DataTable from "./data-table"
import CardProfit from "./util/CardProfit"
import ChartPenjualan from "./util/ChartPenjualan"
import CardBiayaSuplai from "./util/CardBiayaSuplai"

interface Props {}
export default function Page({}: Props) {

  const { data: Transaksi } = useGetDataTransaksi()
  const { data: Produk, isLoading, isError, isSuccess } = useGetLaporanPejualan()

  const jsonData: dataItems[] = Produk
    ? Produk?.data.map((item) => {
        return {
          id: item.id,
          idTransaksi: item.idTransaksi,
          namaProduk: item.namaProduk,
          kodeProduk: item.kodeBarang,
          hargaPerProduk: item.hargaPerProduk,
          quantity: item.quantity,
          total: item.total
        }
      })
    : []

  if (isLoading) {
    return <CardSkeleton />
  } else {
    return (
      <div className="">

      <div className='flex justify-between'>
        <div>
          <DataTable columns={columns} data={jsonData} />
        </div>
        <div className='p-6'>
          <CardBiayaSuplai data={Produk?.hpp}/>
          <CardProfit data={Produk?.labaBersih}/>
        </div>
      </div>

      <div className="p-2 pt-12">
        <ChartPenjualan data={Transaksi?.data}/>
      </div>
      </div>
    )
  }
}
