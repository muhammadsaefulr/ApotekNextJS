/*
  Warnings:

  - You are about to drop the column `biayaSupplaiProduk` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the column `stokAwal` on the `Barang` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "biayaSupplaiProduk",
DROP COLUMN "stokAwal",
ADD COLUMN     "biayaSupplai" INTEGER;
