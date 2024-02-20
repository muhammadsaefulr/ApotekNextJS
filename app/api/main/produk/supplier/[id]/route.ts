import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function DELETE(req: Request ,{params}: {params: {id: string}}) {
    try {
        const idParam = parseInt(params.id)

        const IsSupplierExist = await prisma.supplierBarang.findUnique({
            where: {
                id: idParam
            }
        })

        if(!IsSupplierExist){
            return NextResponse.json({message: `Supplier Barang Dengan ID ${idParam} Tidak Ditemukan !`}, {status: 404})
        }

        const deleteSupplier = prisma.supplierBarang.delete({
            where: {
                id: idParam
            }
        })

        return NextResponse.json({message: "Supplier Barang Berhasil Di Hapus", data: deleteSupplier}, {status: 200})
    } catch (err){
        return NextResponse.json({message: "Internal Server Error ", error_detail: err}, {status: 500})
    } 
}