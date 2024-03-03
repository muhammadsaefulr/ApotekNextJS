// components/ToCSV.tsx

import React from "react"
import { File } from "lucide-react"
import { CSVLink } from "react-csv"

import { Button } from "@/components/ui/button"
import { useGetLaporanPejualan, useGetProduct } from "@/app/react-query/action"

const columnsCSV = [
  { label: "id", key: "id" },
  { label: "Nama Produk", key: "namaBarang" },
  { label: "Kode Produk", key: "kodeProduk" },
  { label: "Harga Produk", key: "hargaJual" },
  { label: "Harga Distributor", key: "hargaAwal" },
  { label: "Stok", key: "stok" },
  { label: "Supplier", key: "supplier" },
]

const ToCSVProduk = () => {
  const { data: Produk } = useGetProduct()

  const jsonData = Produk
    ? Produk?.data.map((item) => {
        return {
          id: item.id,
          kodeProduk: item.kodeProduk,
          namaBarang: item.namaBarang,
          kategori: item.kategori,
          stok: item.stok,
          supplier: item.supplier,
          hargaJual: item.hargaJual,
          hargaAwal: item.hargaAwal
        }
      })
    : []

  return (
    <div>
      <CSVLink headers={columnsCSV} data={jsonData}>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto hidden h-8 lg:flex'
        >
          {" "}
          <File className='mx-2' size={15} />
          Download CSV
        </Button>
      </CSVLink>
    </div>
  )
}

export default ToCSVProduk
