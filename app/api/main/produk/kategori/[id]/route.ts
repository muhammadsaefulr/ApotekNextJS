import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idParams = parseInt(params.id)

    const isKategori = await prisma.kategoriObat.findUnique({
        where: {
            id: idParams
        }
    })

    if(!isKategori){
        return NextResponse.json({message: `Kategori Barang Dengan Id ${idParams} Tidak Ditemukan !`}, { status: 404})
    }

    const deleteKategoribarang = await prisma.kategoriObat.delete({
        where: {
            id: idParams
        }
    })

    return NextResponse.json(
      { message: "Berhasil Menghapus Jenis Barang ! ", detail: deleteKategoribarang},
      { status: 200 },
    )
    
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", error_details: err },
      { status: 500 },
    )
  }
}
