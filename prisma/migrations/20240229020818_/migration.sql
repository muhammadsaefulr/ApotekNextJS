-- DropForeignKey
ALTER TABLE "Barang" DROP CONSTRAINT "Barang_idSupplier_fkey";

-- DropForeignKey
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_kodeBarang_fkey";

-- AddForeignKey
ALTER TABLE "Barang" ADD CONSTRAINT "Barang_idSupplier_fkey" FOREIGN KEY ("idSupplier") REFERENCES "SupplierBarang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_kodeBarang_fkey" FOREIGN KEY ("kodeBarang") REFERENCES "Barang"("kodeProduk") ON DELETE CASCADE ON UPDATE CASCADE;
