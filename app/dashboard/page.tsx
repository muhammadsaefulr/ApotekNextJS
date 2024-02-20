import { useRouter } from "next/navigation"
import { CreditCard, DollarSign, LineChart, Users } from "lucide-react"
import { getServerSession } from "next-auth"

import { AuthOptions } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CardsChat } from "./components/chat"
import OverviewBar from "./components/overviewBar"
import PieChartAnalytics from "./components/pieChart"
import RecentSale from "./components/recentSale"
import { dataValueSupplier, dataValueProduct, dataValueUsers } from "./manualDataFetch"

interface Props {}
export default async function Page({}: Props) {
  const session = await getServerSession(AuthOptions)
  if (!session?.user) {
    console.log("Belum login")
  } else {
    console.log("user login at data: ", session.user)
  }

  const supplierProdukValue = await dataValueSupplier();
  const usersValue = await dataValueUsers()
  const barangValue = await dataValueProduct()

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
                Total Pendapatan / Bln
              </CardTitle>
              <DollarSign size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>Rp 20.000</div>
              <hr className="mt-4 border-2 rounded-md w-24"/>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Jumlah Supplier</CardTitle>
              <CreditCard size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>{supplierProdukValue?.data?.length}</div>
              <hr className="mt-4 border-2 rounded-md w-24"/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>User Aktif</CardTitle>
              <LineChart size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>{usersValue?.data?.length}</div>
              <hr className="mt-4 border-2 rounded-md w-24"/>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Jumlah Produk
              </CardTitle>
              <Users size={16} className='text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>{barangValue?.data?.length}</div>
              <hr className="mt-4 border-2 rounded-md w-24"/>
            </CardContent>
          </Card>
        </div>

        <div className=''>
          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <OverviewBar />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
