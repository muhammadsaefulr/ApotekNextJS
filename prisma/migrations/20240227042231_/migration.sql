/*
  Warnings:

  - Made the column `biayaSupplai` on table `Barang` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Barang" ALTER COLUMN "biayaSupplai" SET NOT NULL;
