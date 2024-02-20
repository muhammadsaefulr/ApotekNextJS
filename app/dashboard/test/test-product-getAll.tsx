"use client"

import { useQuery } from "@tanstack/react-query"

import { ApiProductResponse } from "../../../types/next-api"
import { useGetProduct } from "../../react-query/action"

export default function GetAllProduct() {
    const { data, isLoading, isError, isSuccess } = useGetProduct()

    if (isLoading) {
      return <div>Loading..</div>
    }
  
    console.log(data?.data)
    return (
      <div>
        <p>This message From api : {data?.message}</p>
        <ul className="p-4">
          {data?.data.map((item: any) => (
            <li key={item.id} className="p-3">
              <p>ID: {item.id}</p>
              <p>Kode Produk: {item.kodeProduk}</p>
              <p>Nama Barang: {item.namaBarang}</p>
              <p>Jenis Obat : {item.jenis.jenisObat}</p>
              <p>Supplier : {item.supplier.namaSupplier}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
