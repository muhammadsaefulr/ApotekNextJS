/*
  Warnings:

  - You are about to drop the column `harga` on the `Barang` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hargaAwal]` on the table `Barang` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hargaJual]` on the table `Barang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hargaAwal` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hargaJual` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "harga",
ADD COLUMN     "hargaAwal" INTEGER NOT NULL,
ADD COLUMN     "hargaJual" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Barang_hargaAwal_key" ON "Barang"("hargaAwal");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_hargaJual_key" ON "Barang"("hargaJual");
