import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function DELETE(req:Request, { params }: {params: {id: any}}) {
    try {
        const idParam = parseInt(params.id)

        const transaksi = await prisma.transaksi.findUnique({
            where: { id: idParam },
          })

        const idTransaksi = transaksi?.idTransaksi
        if(!transaksi){
            return NextResponse.json({message: `Transaksi Dengan Kode ID ${idParam} Tidak Ditemukan !`}, {status: 200})
        }

        const deleteTransaksi = await prisma.transaksi.delete({
            where: {id: idParam},
        })

        return NextResponse.json({message: `Berhasil Menghapus Barang Dengan ID ${idParam} Dan ID Transaksi ${idTransaksi}`, data: deleteTransaksi}, {status: 200})

    }  catch (err){
        return NextResponse.json({message: "Internal Server Error", err_details: err}, {status: 500})
    } 
}