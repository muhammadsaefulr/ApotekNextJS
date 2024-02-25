import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const sizePage = parseInt(searchParams.get("size") || "10", 10)
    const viewBy = (searchParams.get("view"))

    let startDate;
    let endDate;

    if(viewBy === "day"){
      const today = new Date()
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    } else if(viewBy === "moth"){
      const today = new Date()
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    }

    const skip = (page - 1) * sizePage

    const transaksi = await prisma.transaksi.findMany({
      take: sizePage,
      skip,
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate
        }
      }
    })

    return NextResponse.json(
      {
        message: "Berhasil Mengambil Semua Data Transaksi !",
        data: transaksi,
        page: page,
        sizePage: sizePage,
      },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_details: err },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const jsonData = await req.json()

    let transactions = [];

    for (const data of jsonData) {
      const { kodeProduk, quantity } = data

      const barang = await prisma.barang.findUnique({
        where: { kodeProduk: kodeProduk },
      })

      if (!barang) {
        return NextResponse.json({ message: "Barang tidak ditemukan !" })
      }

      let updateBarang
      let total

      if (barang.hargaAwal && barang.hargaJual && barang.stok !== null) {
        if (barang.stok - quantity < 0) {
          return NextResponse.json({
            message: "Stok tidak mencukupi",
          })
        }

        total = quantity * barang.hargaJual

        updateBarang = await prisma.barang.update({
          where: {
            kodeProduk: kodeProduk,
          },
          data: {
            stok: barang.stok - quantity,
          },
        })
      }

      const generateKodeTransaksi = () => {
        const uuid: string = uuidv4().substring(0, 12).toUpperCase()
        return uuid
      }

      transactions.push({
        namaProduk: barang.namaBarang,
        kodeBarang: data.kodeProduk,
        idTransaksi: generateKodeTransaksi(),
        hargaPerProduk: barang.hargaAwal,
        quantity: data.quantity,
        total: barang.hargaAwal * data.quantity,
      });
    }
     
    const result = await prisma.transaksi.createMany({
      data: transactions,
    });

    return NextResponse.json(
      { message: "Transaksi Berhasil !", data: transactions },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_details: err },
      { status: 500 },
    )
  }
}