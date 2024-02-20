/*
  Warnings:

  - A unique constraint covering the columns `[kategoriObat]` on the table `kategoriObat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idKategori` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barang" ADD COLUMN     "idKategori" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "kategoriObat_kategoriObat_key" ON "kategoriObat"("kategoriObat");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_idKategori_fkey" FOREIGN KEY ("idKategori") REFERENCES "kategoriObat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
