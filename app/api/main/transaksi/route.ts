import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const transaksi = await prisma.transaksi.findMany()

    return NextResponse.json({message: "Berhasil Mengambil Semua Data Transaksi !", data: transaksi})
  } catch (err){
    return NextResponse.json({messsage: "Internal Server Error !", err_details: err})
  }
}

export async function POST(req: Request) {
  try {
    const { kodeProduk, quantity } = await req.json()

    const barang = await prisma.barang.findUnique({
      where: { kodeProduk: kodeProduk },
    })

    if (!barang) {
      return NextResponse.json({ message: "Barang tidak ditemukan !" })
    }

    let updateBarang;
    let total;

    if(barang.hargaAwal && barang.hargaJual && barang.stok !== null){

      if (barang.stok - quantity < 0) {
        return NextResponse.json({
          message: "Stok tidak mencukupi"
        });
      }

    total = quantity * barang.hargaJual

     updateBarang = await prisma.barang.update({
        where: {
            kodeProduk: kodeProduk
        },
        data: {
            stok: barang?.stok - quantity
        }
    })
    }

    const generateKodeTransaksi = () => {
        const uuid: string = uuidv4().substring(0, 12).toUpperCase()
        return uuid
      }

    const transaksi = await prisma.transaksi.create({
        data: {
            namaProduk: barang.namaBarang,
            kodeBarang: kodeProduk,
            idTransaksi: generateKodeTransaksi(),
            hargaPerProduk: barang.hargaAwal,
            quantity: quantity,
            total: total!
        }
    })

    return NextResponse.json({message: "Transaksi Berhasil !", data: transaksi}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: "Internal Server Error !", err_details: err}, {status: 500})
  }
}
