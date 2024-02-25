"use client"

import React from "react"

import CardSkeleton from "@/components/CardSkeleton"

import { Data, columns } from "./columns"
import DataTable from "./data-table"
import useTransaksiStore from "@/app/state/store/store"
import { setStateDataBarangQuery } from "@/app/state/store/queryInput/store"
import { DataTransaksi } from "@/types/next-api"
import { useGetDataTransaksi } from "@/app/react-query/action"

interface Props {}
export default function LastTranscation({}: Props) {

  const {dataBarangQuery} = setStateDataBarangQuery()
  const { data: Transaksi, isLoading, isError, isSuccess } = useGetDataTransaksi({viewBy: "day"})
  console.log("state query: ", dataBarangQuery)
  if (isLoading) {
    return <CardSkeleton />
  }

  const jsonData: Data[] =  Transaksi
  ? Transaksi?.data.map((item)  => {
    return {
    id: item.id,
    namaProduk: item.namaProduk,
    hargaPerProduk: item.hargaPerProduk,
    total: item.total,
    idTransaksi: item.idTransaksi,
    kodeProduk: item.kodeBarang,
    quantity: item.quantity,
    };
  }) : []

  if (isSuccess) {
  console.log("data yang di ambil : ", Transaksi?.data)
  }
  return (
    <div>
      <DataTable columns={columns} data={jsonData} />
    </div>
  )
}
