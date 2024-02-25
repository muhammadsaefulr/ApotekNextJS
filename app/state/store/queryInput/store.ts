import { create } from "zustand"

interface queryBarangInitialization {
    dataBarangQuery?: any
    setDataBarangQuery: (data: any) => void 
}

interface querySupplierInitialization {
    dataSupplierQuery?: any
    setDataSupplierQuery: (data: any) => void
}

interface queryStaffInitialization {
    dataStaffQuery?: any
    setDataStaffQuery: (data: any) => void
}

export const setStateDataBarangQuery = create<queryBarangInitialization>((set) => ({
    setDataBarangQuery: (data?: any) => set({dataBarangQuery: data})
}))

export const setStateDataSupplierQuery = create<querySupplierInitialization>((set) => ({
    setDataSupplierQuery: (data: any) => set({dataSupplierQuery: data})
}))

export const setStatedataStaffQuery = create<queryStaffInitialization>((set) => ({
    setDataStaffQuery: (data: any) => set({dataStaffQuery: data})
}))