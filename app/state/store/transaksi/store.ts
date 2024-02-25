import { create } from "zustand";


interface DataBarangInitialization {
    dataBarang: any[]; 
    setDataBarang: (data: any[]) => void; 
}

export const setDataBarangTransaksi = create<DataBarangInitialization>((set) => ({
    dataBarang: [], 
    setDataBarang: (data: any[]) => set((state) => ({ dataBarang: [...state.dataBarang, ...data] })) // Menggabungkan data yang baru dengan yang sudah ada
}));
