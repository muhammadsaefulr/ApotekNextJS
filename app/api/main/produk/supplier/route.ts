import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { namaSupplier, emailSupplier } = await req.json()

    const isSupplierNameExist = await prisma.supplierBarang.findUnique({
      where: {
        namaSupplier: namaSupplier,
      },
    })

    if (isSupplierNameExist) {
      return NextResponse.json(
        { message: "Supplier Sudah Ada, Silahkan Tambah Yang Lain !" },
        { status: 400 },
      )
    }

    const dataRes = await prisma.supplierBarang.create({
      data: {
        namaSupplier: namaSupplier,
        emailSupplier: emailSupplier,
      },
    })

    return NextResponse.json(
      {
        message: "Data berhasil dibuat !",
        data: dataRes,
      },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", error_detail: err },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    const findNamaSupplier = searchParams.get("nama") || ""

    let whereQuery = {} as any
    if(findNamaSupplier){
      whereQuery = {namaSupplier: {contains: findNamaSupplier}}
    }

    const dataRes = await prisma.supplierBarang.findMany({
      include: { namaBarang: true },
      where: whereQuery
    })

    return NextResponse.json({ message: "Berhasil Request !", data: dataRes })
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", error_details: err },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  try {
    return NextResponse.json(
      { message: "Parameter Query Masih kosong, example: /barang/supplier/{id}" },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", detail_error: err },
      { status: 500 },
    )
  }
}
