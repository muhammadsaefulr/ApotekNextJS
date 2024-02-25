"use client"

import React, { useEffect } from "react"

import { DataTransaksi } from "@/types/next-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CardSkeleton from "@/components/CardSkeleton"
import { useAddTransaksi, useGetDataTransaksi } from "@/app/react-query/action"
import { setStateDataBarangQuery } from "@/app/state/store/queryInput/store"
import useDataTransaksiStore from "@/app/state/store/store"
import { setDataBarangTransaksi } from "@/app/state/store/transaksi/store"

import { Barang, columns } from "./columns"
import DataTable from "./data-table"

interface Props {}
export default function Page({}: Props) {
  const { dataBarang } = setDataBarangTransaksi()
  const {mutate: addTransaksi, data} = useAddTransaksi()  
  const { data: DataTransaksi, isSuccess, isLoading } = useGetDataTransaksi()
  
  let total = 0;
  
  for(let i = 0; i < dataBarang?.length; i++){
    total += dataBarang[i].total;
  }

  if (isLoading) {
    return <CardSkeleton />
  }

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = months[currentDate.getMonth()]
  const year = currentDate.getFullYear()

  const formattedDate = `${day} ${month} ${year}`

  const jsonData: Barang[] = dataBarang
    ? dataBarang.map((item: any) => ({
       id: item.id,
       namaProduk: item?.namaBarang,
       namaSupplier: item?.namaSupplier,
       total: item?.total,
       hargaPerPcs: item?.hargaPerPcs,
       kodeProduk: item?.kodeProduk,
       quantity: item?.quantity
      }))
    : []

  if (isSuccess) {
    console.log("data yang di ambil : ", DataTransaksi?.data)
  }

  const submitTransaction = () => {

    const dataValuesSubmitValidation: any[] = dataBarang
    ? dataBarang.map((item: any) => ({
       kodeProduk: item?.kodeProduk,
       quantity: item?.quantity
      }))
    : []

    console.log("data submit transaction : ", dataValuesSubmitValidation)
    addTransaksi(dataValuesSubmitValidation)
  } 

  return (
    <div>
      <div className='flex justify-between'>
        <p className='mb-3 font-bold'>
          DATE: <a className='font-regular'>{formattedDate}</a>
        </p>
        <Button type='submit' form='addbills-form'>
          Tambah Ke List
        </Button>
      </div>
      <DataTable columns={columns} data={jsonData} />

      <div className='flex justify-between pt-3'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <p className='font-bold'>Total Harga</p>
          <Input
            value={total}
            disabled={true}
            type='name'
            id='name'
          />
        </div>
        <div className='mt-8'>
          <Button type='submit' onClick={submitTransaction}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
