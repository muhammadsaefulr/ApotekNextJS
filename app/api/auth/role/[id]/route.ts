import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idParam = parseInt(params.id)

    const dataRole = await prisma.role.findUnique({
      where: {
        id: idParam,
      },
    })

    if (!dataRole) {
      return NextResponse.json(
        { message: `Data Dengan ID ${idParam} Tidak Ditemukan` },
        { status: 404 },
      )
    }

    const deleteDataFromId = await prisma.role.delete({
      where: {
        id: idParam,
      },
    })

    return NextResponse.json(
      {
        message: `Berhasil Menghapus Data Dengan Id ${idParam}`,
        data: deleteDataFromId,
      },
      { status: 200 },
    )
  } catch (err) {
    NextResponse.json(
      { message: "Internal Server Error", err_details: err },
      { status: 500 },
    )
  }
}
