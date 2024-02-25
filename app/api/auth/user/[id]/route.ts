import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idParam = parseInt(params.id)

    const dataUser = await prisma.user.findUnique({
      where: {
        id: idParam,
      },
    })

    if (!dataUser) {
      return NextResponse.json(
        { message: "Data Yang Dicari Tidak Ditemukan !" },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { message: "Berhasil !", data: dataUser },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", err_details: err },
      { status: 500 },
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const idParams = parseInt(params.id)
    const { username, email, password } = await req.json()

    const isData = await prisma.user.findUnique({
      where: {
        id: idParams,
      },
    })

    if (!isData) {
      return NextResponse.json(
        { message: `Data dengan id ${idParams} tidak ditemukan !` },
        { status: 404 },
      )
    }

    const dataEdit = await prisma.user.update({
      where: {
        id: idParams,
      },
      data: {
        username: username,
        email: email,
        password: password,
      },
    })

    return NextResponse.json(
      { message: "Data berhasil di update !", data: dataEdit },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_details: err },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
  try {
    const idParam = parseInt(params.id)

    const user = await prisma.user.findUnique({
        where: {
            id: idParam
        }
    })

    if(!user){
        return NextResponse.json({message: `User dengan id ${idParam} tidak ditemukan !`}, {status: 404})
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: idParam
        }
    })

    return NextResponse.json({message: `Berhasil Menghapus user dengan id ${idParam}`, data: deleteUser}, {status: 200})

  } catch (err){
    return NextResponse.json({message: "Internal Server Error", err_details: err}, {status: 500})
  } 
} 
