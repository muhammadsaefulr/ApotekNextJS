"use client"

import React from "react"

import CardSkeleton from "@/components/CardSkeleton"
import { useGetProduct } from "@/app/react-query/action"

import { Barang, columns } from "./columns"
import DataTable from "./data-table"
import useProductStore from "@/app/state/store/store"
import { setStateDataBarangQuery } from "@/app/state/store/queryInput/store"

interface Props {}
export function PageProduct({}: Props) {

  const {dataBarangQuery} = setStateDataBarangQuery()
  const { data: Product, isLoading, isError, isSuccess } = useGetProduct({kategori: dataBarangQuery?.kategori, produk: dataBarangQuery?.produk})
  console.log("state query: ", dataBarangQuery)
  if (isLoading) {
    return <CardSkeleton />
  }

  const jsonData: Barang[] = Product
    ? Product?.data?.map((item: any) => ({
        id: item.id,
        kodeProduk: item.kodeProduk,
        namaBarang: item.namaBarang,
        kategori: item.kategori,
        stok: item.stok,
        supplier: item.supplier,
        hargaJual: item.hargaJual,
        hargaAwal: item.hargaAwal
      }))
    : []
  if (isSuccess) {
  console.log("data yang di ambil : ", Product?.data)
  }
  return (
    <div>
      <DataTable columns={columns} data={jsonData} />
    </div>
  )
}
