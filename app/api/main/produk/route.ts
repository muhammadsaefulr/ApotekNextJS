import { url } from "inspector"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const sortBy = searchParams.get("sortby") || "id"
    const urutan = searchParams.get("urutan") || "asc"
    const idKategori = parseInt(searchParams.get("kategori") || "")
    const namaBarang = searchParams.get("produk")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const page = parseInt(searchParams.get("page") || "1", 10)
    const sizePage = parseInt(searchParams.get("size") || "10", 10)

    const DEFAULT_PAGE_SIZE = 10

    const skip = (page - 1) * sizePage

    const orderBy = { [sortBy]: urutan === "desc" ? "desc" : "asc" }

    const allowedFields = ["id", "namaBarang", "kategori"]

    if (!allowedFields.includes(sortBy) && !isNaN(idKategori)) {
      return NextResponse.json(
        { message: "Format Query Sortby Tidak Benar, Silahkan Perbaiki !" },
        { status: 403 },
      )
    }

    let tanggalAwal = null
    let tanggalAkhir = null
    let whereCondition = {} as any
    // const where = {} as any

    if (idKategori && namaBarang) {
      whereCondition.AND = [
        { idKategori },
        { namaBarang: { contains: namaBarang } }
      ]
    } else {
      if (idKategori) {
        whereCondition.idKategori = idKategori
      }
      
      if (namaBarang) {
        whereCondition.namaBarang = { contains: namaBarang }
      }
    }

    if (startDate && endDate) {
      tanggalAwal = new Date(startDate)
      tanggalAkhir = new Date(endDate)
      whereCondition.tanggalMasuk = {
        gte: tanggalAwal,
        lte: tanggalAkhir,
      }
    }

    const products = await prisma.barang.findMany({
      orderBy,
      skip,
      take: sizePage,
      where: whereCondition,
      include: {
        kategori: {
          select: {
            kategoriObat: true,
          },
        },
        supplier: true,
      },
    })

    const dataResJson = products?.map((item) => ({
      ...item,
      kategori: item.kategori?.kategoriObat,
      supplier: item.supplier.namaSupplier,
      emailSupplier: item.supplier.emailSupplier,
    }))

    return NextResponse.json(
      {
        message: "Berhasil",
        data: dataResJson,
        page,
        sizePage,
        tests: idKategori,
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
    const {
      namaBarang,
      idKategori,
      idSupplier,
      detilBarang,
      hargaAwal,
      hargaJual,
      stok,
      nomorRak,
      tglKeluar,
      tglKadaluarsa,
      kodeProduk,
    } = await req.json()

    const namaBarangUp = namaBarang.toUpperCase()

    if (typeof idKategori === "number" && !Number.isInteger(idKategori)) {
      return NextResponse.json(
        {
          message:
            "idKategori hanya bertipe integer, coba cek kembali body request !",
        },
        { status: 400 },
      )
    }

    if (typeof stok === "number" && !Number.isInteger(stok)) {
      return NextResponse.json(
        {
          message:
            "stokBarang hanya bertipe integer, coba cek kembali body request !",
        },
        { status: 403 },
      )
    }

    if (!namaBarang || !idKategori) {
      return NextResponse.json(
        { message: "Request Body Yang Diminta Salah, Silahkan Cek Kembali !" },
        { status: 400 },
      )
    }

    const isBarangExist = await prisma.barang.findUnique({
      where: {
        namaBarang: namaBarangUp,
      },
    })

    if (isBarangExist) {
      return NextResponse.json({ message: "Data Sudah Ada !" }, { status: 403 })
    }

    if (nomorRak === null) {
      nomorRak + 0
    }

    if (kodeProduk && (kodeProduk.length < 9 || kodeProduk.length > 9)) {
      return NextResponse.json({
        message: "Kode Produk Tidak Boleh Lebih Atau Kurang Dari 9 Karakter",
      })
    }

    const generateKodeProduk = () => {
      const uuid: string = uuidv4().substring(0, 9).toUpperCase()
      return uuid
    }

    const dataRes = await prisma.barang.create({
      data: {
        namaBarang: namaBarangUp,
        idSupplier: idSupplier,
        idKategori: idKategori,
        detilBarang: detilBarang,
        hargaAwal: hargaAwal,
        hargaJual: hargaJual,
        stok: stok,
        idRakBarang: nomorRak,
        tglKadaluarsa: tglKadaluarsa,
        kodeProduk: kodeProduk == null ? generateKodeProduk() : kodeProduk,
        tanggalKeluar: tglKeluar,
      },
    })

    return NextResponse.json(
      { message: "Data Berhasil Dibuat !", data: dataRes },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", detail_error: err },
      { status: 500 },
    )
  }
}

export async function DELETE() {
  try {
    return NextResponse.json(
      { message: "Parameter Query Masih kosong, example: /barang/{id}" },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", detail_error: err },
      { status: 500 },
    )
  }
}

export async function PUT() {
  try {
    return NextResponse.json(
      { message: "Parameter Query Masih kosong, example: /barang/{id}" },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", detail_error: err },
      { status: 500 },
    )
  }
}
