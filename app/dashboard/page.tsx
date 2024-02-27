import { useRouter } from "next/navigation"
import { Boxes, CreditCard, DollarSign, LineChart, TruckIcon, User2Icon, Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  dataValueProduct,
  dataValueSupplier,
  dataValueTransaksi,
  dataValueUsers,
} from "./manualDataFetch"
import LastTranscation from "./tablePreview/lasttransaction/page"

interface Props {}
export default async function Page({}: Props) {
  const supplierProdukValue = await dataValueSupplier()
  const usersValue = await dataValueUsers()
  const transaksiValue = await dataValueTransaksi()
  const barangValue = await dataValueProduct()

  let totalPendapatan = 0

  transaksiValue?.data.forEach((transaksi: any) => {
    totalPendapatan += transaksi.total
  })

  return (
    <div className='space-y-8'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
      </div>

      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Pendapatan / Hari
              </CardTitle>
              <DollarSign size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>Rp {totalPendapatan}</div>
              <hr className='mt-4 w-24 rounded-md border-2' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Jumlah Supplier
              </CardTitle>
              <TruckIcon size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {supplierProdukValue?.data?.length}
              </div>
              <hr className='mt-4 w-24 rounded-md border-2' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>User Aktif</CardTitle>
              <User2Icon size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {usersValue?.data?.length}
              </div>
              <hr className='mt-4 w-24 rounded-md border-2' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Jumlah Produk
              </CardTitle>
              <Boxes size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>
                {barangValue?.data?.length}
              </div>
              <hr className='mt-4 w-24 rounded-md border-2' />
            </CardContent>
          </Card>
        </div>

        <div className=''>
          <LastTranscation />
        </div>
      </div>
    </div>
  )
}
