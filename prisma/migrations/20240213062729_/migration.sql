/*
  Warnings:

  - You are about to drop the column `kategori` on the `Barang` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "kategoriObatIsHardCode" AS ENUM ('BEBAS', 'KERAS', 'TERBATAS', 'NARKOTIKA');

-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "kategori";

-- DropEnum
DROP TYPE "kategoriObat";

-- CreateTable
CREATE TABLE "kategoriObat" (
    "id" SERIAL NOT NULL,
    "kategoriObat" TEXT NOT NULL,

    CONSTRAINT "kategoriObat_pkey" PRIMARY KEY ("id")
);
