import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password, roleId} = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
        username: username,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User Sudah Sudah Terdaftar! Silahkan Login" },
        { status: 403 }
      );
    }

    if(!username || !email || !password || !roleId){
      return NextResponse.json({message: "Request Invalid, Coba Cek Kembali Body Request !"}, {status: 400})
    }

    const userRegistred = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
        roleId: parseInt(roleId)
      },
    });

    return NextResponse.json(
      { message: "data berhasil dibuat !", data: userRegistred },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error", err_details: err }, { status: 500 });
  }
}
