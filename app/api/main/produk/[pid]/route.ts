import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async (
  req: Request,
  { params }: { params: { pid: any } },
) => {
  const dataParams = parseInt(params.pid)

  if (!dataParams || isNaN(dataParams)) {
    return NextResponse.json({ message: `Id Params Kosong !` }, { status: 403 });
  }

  const dataRes = await prisma.barang.findUnique({
    where: {
      id: dataParams
    }
  })

  if(!dataRes){
    return NextResponse.json({message: "Data Tidak Ditemukan !"}, {status: 404})
  }

  return NextResponse.json({message:"Berhasil !", data: dataRes }, { status: 200 })
}

export async function PUT(
  req: Request,
  { params }: { params: { pid: any } },
) {
  try {
    const dataParams = parseInt(params.pid)

    const {
        namaBarang,
        detilBarang,
        hargaAwal,
        hargaJual,
        kodeProduk,
        stok,
        idRakBarang,
      } = await req.json()
      
      const isDataAvailable = await prisma.barang.findUnique({
        where: {
          id: dataParams
        }
      })

    if(!isDataAvailable){
      return NextResponse.json({message: `Data Dengan Id ${dataParams} tidak ditemukan`}, {status: 404})
    }

    const dataUpdateRecord = await prisma.barang.update({
      where: {
        id: dataParams
      },
      data: {
        namaBarang: namaBarang,
        detilBarang: detilBarang,
        hargaAwal: hargaAwal,
        hargaJual: hargaJual,
        kodeProduk: kodeProduk,
        stok: stok,
        idRakBarang: idRakBarang
      }
    })

    return NextResponse.json(
      { message: `Berhasil Mengupdate Data Dengan Id ${dataParams}`, data: dataUpdateRecord},
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_details: err },
      { status: 500 },
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { pid: any } },
) {
  try {
    const idParam = parseInt(params.pid)

    if (idParam == null) {
      return NextResponse.json(
        { message: "Id Params Tidak Boleh Kosong !" },
        { status: 400 },
      )
    }

    const findBarangById = await prisma.barang.findUnique({
      where: {
        id: idParam,
      },
    })

    if (!findBarangById) {
      return NextResponse.json(
        {
          message: `Barang Dengan Id ${idParam} Tidak Ditemukan Pada Database !`,
        },
        { status: 404 },
      )
    }
    const transaction = await prisma.transaksi.deleteMany({
      where: {
        kodeBarang: {
          equals: findBarangById.kodeProduk || undefined,
        },
      },
    });

    const deleteBarang = await prisma.barang.delete({
      where: {
        id: idParam,
      },
    })

    return NextResponse.json(
      { message: "Berhasil Menghapus : ", deleteBarang, transaction},
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", detail_error: err },
      { status: 500 },
    )
  }
}
