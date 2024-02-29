import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { username, email, password, roleId } = await req.json()

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUsername || existingEmail) {
      return NextResponse.json(
        { message: "User already exists! Returning Redirect Into Loading." },
        { status: 200 },
      )
    }

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Request Invalid, Coba Cek Kembali Body Request !" },
        { status: 403 },
      )
    }

    const userRegistred = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
        roleId: roleId != null ? parseInt(roleId) : 2,
      },
    })

    return NextResponse.json(
      { message: "data berhasil dibuat !", data: userRegistred },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", err_details: err },
      { status: 500 },
    )
  }
}
