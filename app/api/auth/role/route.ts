import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  try {
    const { roleNameAdd } = await req.json()
    const isRoleExist = await prisma.role.findUnique({
      where: {
        roleName: roleNameAdd,
      },
    })

    if (isRoleExist) {
      NextResponse.json(
        {
          message: "Role Ini Sudah Ada",
        },
        { status: 403 },
      )
    }

    const addNewRole = await prisma.role.create({
      data: {
        roleName: roleNameAdd,
      },
    })

    return NextResponse.json(
      { message: "Role Berhasil Dibuat", data: addNewRole },
      { status: 200 },
    )
  } catch (err) {
    NextResponse.json({ message: "Internal Server Error " }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const dataRole = await prisma.role.findMany()

    return NextResponse.json(
      { message: "Berhasil Request !", data: dataRole },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_details: err },
      { status: 500 },
    )
  }
}
