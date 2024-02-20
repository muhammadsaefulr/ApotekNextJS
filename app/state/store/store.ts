import { create } from 'zustand'
import { BarangState, BarangActions } from '../interfaces/barangInterface'
import axios from 'axios'
import { useGetProduct } from '@/app/react-query/action'
import { DataItemProduct } from '@/types/next-api'

const useProductStore = create((set, get) => ({
  
  products: [],
  isGetProductError: false,

  suppliers: [],  
  isGetSupplierError: false,

  jenis: [],
  isGetJenisError: false,

  getProduct: async () => {
    const { data, isError } = await useGetProduct();
    set({ products: data || [], isGetProductError: isError });
  }
}));

export default useProductStore;
