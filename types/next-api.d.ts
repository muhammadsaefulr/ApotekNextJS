
// Types Interface Barang
export interface ApiProductResponse {
    message: string,
    data: DataItemProduct[]
}

export interface ApiSupplierResponse {
    message: string;
    data: Supplier[];
}

export interface Kategori {
    message: string;
    data: kategoriDataObat[];
}

export interface DataItemProduct {
    id: number;
    kodeProduk: string;
    namaBarang: string;
    detilBarang: string;
    stok: number;
    hargaAwal?: number;
    hargaJual?: number;
    supplier: string;
    idKategori: number;
    tglKadaluarsa: string;
    idRakBarang: number;
    tanggalMasuk: string;
    tanggalKeluar: string;
    idJenis: string;
    idSupplier: string;
  }

export interface kategoriDataObat {
    id: number;
    kategoriObat: string;
    createdAt: string;
}


export interface Supplier {
    id: number;
    namaSupplier: string;
    emailSupplier: string;
    // alamatSupplier: string;
    createdAt: string;
}

export interface BarangDataSubmit {
  kodeProduk: string;
  namaBarang: string;
  detilBarang: string;
  stok: number;
  harga: number;
  tglKadaluarsa?: string;
  idJenis: number;
  idSupplier: number;
  idRakBarang: number;
}

export interface DataStaff {
    id: number,
    username: string,
    email: string,
    role: string,
}

export interface ApiStaffList {
  message: string,
  data: DataStaff[]
}

export interface DataTransaksi {
    id: number,
    idTransaksi: string,
    namaProduk: string,
    kodeBarang: string,
    quantity: number,
    hargaPerProduk: number,
    total: number,
    createdAt: string
}

export interface ApiTransaksi{
    message: string,
    data: DataTransaksi[]
}