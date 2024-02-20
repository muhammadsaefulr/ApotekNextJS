-- CreateEnum
CREATE TYPE "kategoriObat" AS ENUM ('BEBAS', 'KERAS', 'TERBATAS', 'NARKOTIKA');

-- AlterTable
ALTER TABLE "Barang" ADD COLUMN     "kategori" "kategoriObat" NOT NULL DEFAULT 'BEBAS';
