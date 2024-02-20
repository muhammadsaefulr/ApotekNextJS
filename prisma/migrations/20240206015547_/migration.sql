/*
  Warnings:

  - You are about to drop the column `barangId` on the `Transaksi` table. All the data in the column will be lost.
  - Added the required column `kodeBarang` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_barangId_fkey";

-- AlterTable
ALTER TABLE "Transaksi" DROP COLUMN "barangId",
ADD COLUMN     "kodeBarang" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kodeBarang_fkey" FOREIGN KEY ("kodeBarang") REFERENCES "Barang"("kodeProduk") ON DELETE RESTRICT ON UPDATE CASCADE;
