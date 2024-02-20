/*
  Warnings:

  - Added the required column `namaProduk` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaksi" ADD COLUMN     "namaProduk" TEXT NOT NULL;
