import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req:Request) {
    try {
        const dataUser = await prisma.user.findMany()

        return NextResponse.json({message: "Semua Data User Berhasil Di Request !", data: dataUser}, {status: 200})
    } catch (err){
        NextResponse.json({message: "Internal Server Error !", err_detail: err}, {status: 500})
    } 
}