import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (
  req: Request,
  { params }: { params: { id: any } },
) => {
  const dataParams = parseInt(params.id)

  if (!dataParams || isNaN(dataParams)) {
    return NextResponse.json({ message: `Id Params Kosong !` }, { status: 403 });
  }

  const dataRes = await prisma.supplierBarang.findUnique({
    where: {
      id: dataParams
    }
  })

  if(!dataRes){
    return NextResponse.json({message: "Data Tidak Ditemukan !"}, {status: 404})
  }

  return NextResponse.json({message:"Berhasil !", data: dataRes }, { status: 200 })
}

export async function PUT(
    req: Request,
    { params }: { params: { id: any } },
  ) {
    try {
      const dataParams = parseInt(params.id)
  
      const {
            namaSupplier,
            emailSupplier,
        } = await req.json()
        
        const isDataAvailable = await prisma.supplierBarang.findUnique({
          where: {
            id: dataParams
          }
        })
  
      if(!isDataAvailable){
        return NextResponse.json({message: `Data Dengan Id ${dataParams} tidak ditemukan`}, {status: 404})
      }
  
      const dataUpdateRecord = await prisma.supplierBarang.update({
        where: {
          id: dataParams
        },
        data: {
            namaSupplier: namaSupplier,
            emailSupplier: emailSupplier
        }
      })
  
      return NextResponse.json(
        { message: `Berhasil Mengupdate Data Supplier Dengan Id ${dataParams}`},
        { status: 200 },
      )
    } catch (err) {
      return NextResponse.json(
        { message: "Internal Server Error !", err_details: err },
        { status: 500 },
      )
    }
  }

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

        const deleteSupplier = await prisma.supplierBarang.delete({
            where: {
                id: idParam
            }
        })

        return NextResponse.json({message: "Supplier Barang Berhasil Di Hapus", data: deleteSupplier}, {status: 200})
    } catch (err){
        return NextResponse.json({message: "Internal Server Error ", error_detail: err}, {status: 500})
    } 
}