import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        // Mendapatkan tanggal awal dan akhir bulan ini
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), + 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

        // Mendapatkan informasi penjualan bulan ini
        const dataTransaksi = await prisma.transaksi.findMany({
            where: {
                createdAt: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth
                }
            }
        });

        // Menghitung total biaya pembelian (HPP)
        let biayaPembelian = 0;
        const dataBarang = await prisma.barang.findMany();
        dataBarang.forEach(barang => {
            biayaPembelian += barang.biayaSupplai;
        });

        // Menghitung total laba kotor
        let labaKotor = 0;
        dataTransaksi.forEach(transaksi => {
            labaKotor += transaksi.total;
        });

        // Menghitung laba bersih
        const labaBersih = labaKotor !== 0 ? labaKotor - biayaPembelian : 0;

        return NextResponse.json({
            message: "Berhasil Request",
            data: dataTransaksi,
            hpp: biayaPembelian,
            labaKotor: labaKotor,
            labaBersih: labaBersih,
            tanggal: firstDayOfMonth,
            akhirBulan: lastDayOfMonth
        }, {
            status: 200
        });

    } catch (err) {
        return NextResponse.json({
            message: "Internal Server Error !",
            err_details: err
        }, {
            status: 500
        });
    }
}
