"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useGetDataTransaksi } from "@/app/react-query/action"

interface Props {}

const dataDummy = [
  {
    name: "Jan",
    pv: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
  },
  {
    name: "Mar",
    pv: 3041,
  },
  {
    name: "Apr",
    pv: 3908,
  },
]

export default function ChartPenjualan({ data }: any) {
  const totalPenjualan: { [key: string]: number } = {}

  // Menghitung total penjualan untuk setiap nama produk
  data?.forEach((item: any) => {
    if (totalPenjualan[item.namaProduk]) {
      totalPenjualan[item.namaProduk] += item.total
    } else {
      totalPenjualan[item.namaProduk] = item.total
    }
  })

  const dataChart = Object.keys(totalPenjualan).map(namaProduk => ({
    name: namaProduk,
    pv: totalPenjualan[namaProduk]
}));

  console.log("data tables : ", dataChart)

  return (
    <div>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={dataChart}>
          <XAxis
            dataKey='name'
            fontSize={10}
            stroke='#888888'
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={9}
            stroke='#888888'
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `Rp.${value}`}
          />
          <Bar dataKey='pv' fill='rgb(251 146 60)' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
