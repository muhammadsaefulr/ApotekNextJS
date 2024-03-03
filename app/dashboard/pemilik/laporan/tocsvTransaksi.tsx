// components/ToCSV.tsx

import React from "react"
import { File } from "lucide-react"
import { CSVLink } from "react-csv"

import { Button } from "@/components/ui/button"
import { useGetLaporanPejualan } from "@/app/react-query/action"

const columnsCSV = [
  { label: "ID Transaksi", key: "idTransaksi" },
  { label: "Nama Produk", key: "namaProduk" },
  { label: "Kode Produk", key: "kodeProduk" },
  { label: "Harga Produk", key: "hargaPerProduk" },
  { label: "Jumlah Beli", key: "quantity" },
  { label: "Total Bayar", key: "total" },
]

const ToCSVTransaksi = () => {
  const { data: Produk } = useGetLaporanPejualan()

  const jsonData = Produk
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

export default ToCSVTransaksi
