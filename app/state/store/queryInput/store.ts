import { create } from "zustand"

interface queryInitialization {
    dataBarangQuery?: any
    setDataBarangQuery: (data: any) => void 
}

export const setStateDataBarangQuery = create<queryInitialization>((set) => ({
    setDataBarangQuery: (data?: any) => set({dataBarangQuery: data})
}))