import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { kategori } = await req.json()

    if (!kategori) {
      return NextResponse.json({
        message: "Request Invalid, Coba Cek Kembali Body Request !",
      })
    }

    const isExist = await prisma.kategoriObat.findUnique({
      where: {
        kategoriObat: kategori
      }
    })
    
    if (isExist) {
      return NextResponse.json({ message: "kategori Barang Sudah Ada !" })
    }

    const dataReq = await prisma.kategoriObat.create({
      data: {
        kategoriObat: kategori,
      },
    })


    return NextResponse.json(
      { message: "kategori Untuk Barang Berhasil Dibuat !", data: dataReq },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json({ message: "Internal Server Error !", detail_error: err })
  }
}

export async function GET() {
  try {
    const dataReq = await prisma.kategoriObat.findMany()

    if (!dataReq) {
      return NextResponse.json(
        { message: "Data Tidak Ditemukan" },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: "Berhasil Di Request !", data: dataReq },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", error_details: err },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  try {
    return NextResponse.json({message: "Parameter Query Masih kosong, example: /barang/category/{id}"}, {status: 200})
  } catch (err) {
    return NextResponse.json({message: "Internal Server Error !"}, {status: 500})
  }
}
