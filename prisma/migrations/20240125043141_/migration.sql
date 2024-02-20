-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PEMILIK', 'STAFF');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierBarang" (
    "id" SERIAL NOT NULL,
    "namaSupplier" TEXT,
    "emailSupplier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplierBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JenisBarang" (
    "id" SERIAL NOT NULL,
    "jenisObat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JenisBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barang" (
    "id" SERIAL NOT NULL,
    "kodeProduk" TEXT,
    "namaBarang" TEXT NOT NULL,
    "detilBarang" TEXT,
    "stok" INTEGER,
    "harga" INTEGER,
    "tglKadaluarsa" TIMESTAMP(3),
    "idJenis" INTEGER NOT NULL,
    "idSupplier" INTEGER NOT NULL,
    "idRakBarang" INTEGER NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "tanggalKeluar" TIMESTAMP(3),

    CONSTRAINT "Barang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierBarang_namaSupplier_key" ON "SupplierBarang"("namaSupplier");

-- CreateIndex
CREATE UNIQUE INDEX "JenisBarang_jenisObat_key" ON "JenisBarang"("jenisObat");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_kodeProduk_key" ON "Barang"("kodeProduk");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_namaBarang_key" ON "Barang"("namaBarang");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_detilBarang_key" ON "Barang"("detilBarang");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_stok_key" ON "Barang"("stok");

-- CreateIndex
CREATE UNIQUE INDEX "Barang_harga_key" ON "Barang"("harga");

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "SupplierBarang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_idJenis_fkey" FOREIGN KEY ("idJenis") REFERENCES "JenisBarang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
