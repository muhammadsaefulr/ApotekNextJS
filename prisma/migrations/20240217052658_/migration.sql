/*
  Warnings:

  - You are about to drop the column `idJenis` on the `Barang` table. All the data in the column will be lost.
  - You are about to drop the `JenisBarang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_idJenis_fkey";

-- AlterTable
ALTER TABLE "Barang" DROP COLUMN "idJenis";

-- DropTable
DROP TABLE "JenisBarang";
