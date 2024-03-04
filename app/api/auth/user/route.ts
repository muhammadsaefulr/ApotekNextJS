import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const queryRole = searchParams.get("role") || "Staff"
    const username = searchParams.get("username") || ""

    let whereClause: any = {}
    
    if (username) {
      whereClause = {username: {contains: username} }
    }

    const dataUser = await prisma.user.findMany({
      where: {
        role: {
          roleName: queryRole,
        },
        ...whereClause,
      },
      include: {
        role: {
          select: {
            roleName: true,
          },
        },
      },
    })

    const revalidatewData = dataUser?.map((item) => ({
      ...item,
      role: item.role.roleName,
    }))

    return NextResponse.json(
      {
        message: "Semua Data User Berhasil Di Request !",
        data: revalidatewData,
      },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error !", err_detail: err },
      { status: 500 },
    )
  }
}
