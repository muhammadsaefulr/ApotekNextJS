// api.ts
import { kategoriObat } from "@prisma/client"
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { number } from "zod"

import { useToast } from "@/components/ui/use-toast"

import {
  ApiPenjualanLaporanResponse,
  ApiProductResponse,
  ApiStaffList,
  ApiSupplierResponse,
  ApiTransaksi,
  BarangDataSubmit,
  Kategori,
  Supplier,
} from "../../types/next-api"

interface UpdateDataParams {
  id: number
  newObj: any
}

// User Function

export const useRegisterStaff = () => {
  return useMutation({
    mutationKey: ["addStaff"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      return toast.success("Berhasil Registrasi Akun !")
    },
    onError: () => {
      toast.error("Gagal Meregistrasi Akun !")
      setTimeout(function () {
        location.reload()
      }, 2000)
    },
  })
}

export const useAddStaff = () => {
  return useMutation({
    mutationKey: ["addStaff"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      return toast.success("Berhasil Menambahkan Data staff !")
    },
    onError: () => {
      toast.error("Gagal Menambah data staff")
      setTimeout(function () {
        location.reload()
      }, 2000)
    },
  })
}

export const useUpdateDataStaff = () => {
  return useMutation<any, Error, UpdateDataParams>({
    mutationKey: ["updateDataStaff"],
    mutationFn: async ({ id, newObj }: UpdateDataParams) => {
      if (newObj !== null) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/${id}`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Staff")
    },
    onError: () => {
      toast.error("Gagal Mengupdate Staff !")
    },
  })
}

export const useGetStaffList = (queryParams?: {
  role?: string
  username?: string
}) => {
  return useQuery<ApiStaffList>({
    queryKey: ["useGetStaffList", queryParams?.role],
    queryFn: async () => {
      const role = queryParams?.role ?? "Staff"
      const username = queryParams?.username ?? ""
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user?role=${role}&username=${username}`,
        {
          cache: "no-cache",
        },
      )
      return response.json()
    },
  })
}

export const useGetStaffById = () => {
  return useMutation<ApiStaffList>({
    mutationKey: ["getStaffById"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/${newObj}`,
        )
        return response.data
      } else {
        return null
      }
    },
  })
}

export const useDeleteStaff = () => {
  return useMutation({
    mutationKey: ["deleteStaff"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/${newObj}`,
        )
        return response.data
      } else {
        return null
      }
    },
  })
}

// Product Function
export const useGetProduct = (queryparams?: {
  kategori: number
  produk: string
}) => {
  return useQuery<ApiProductResponse>({
    queryKey: ["getProduct", queryparams?.kategori, queryparams?.produk],
    queryFn: async () => {
      const produk = queryparams?.produk ?? ""
      const kategori = queryparams?.kategori ?? 0
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk?kategori=${kategori}&produk=${produk}`,
        {
          cache: "no-cache",
        },
      )
      return response.json()
    },
  })
}

export const useGetProductById = () => {
  return useMutation<ApiProductResponse>({
    mutationKey: ["getProductById"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/${newObj}`,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("berhasil menghapus data !")
    },
    onError: () => {
      toast.error("gagal menghapus data !")
    },
  })
}

export const useAddProduct = () => {
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data Produk !")
    },
  })
}

export const useUpdateDataProduct = () => {
  return useMutation<any, Error, UpdateDataParams>({
    mutationKey: ["updateData"],
    mutationFn: async ({ id, newObj }: UpdateDataParams) => {
      if (newObj !== null) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/${id}`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Barang")
    },
    onError: () => {
      toast.error("Gagal Mengupdate Barang !")
    },
  })
}

export const useDeleteDataProduct = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/${id}`,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success("Berhasil Menghapus Produk !")
    },
    onError: () => {},
  })
}

// Kategori Product

export const useGetKategoriProduct = (queryParams?: { sortBy?: string }) => {
  return useQuery<Kategori>({
    queryKey: ["kategori"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/kategori`,
        { cache: "no-cache" },
      )
      return response.json()
    },
  })
}

// Supplier Produk

export const useUpdateDataSupplier = () => {
  return useMutation<any, Error, UpdateDataParams>({
    mutationKey: ["updateDataSupplier"],
    mutationFn: async ({ id, newObj }: UpdateDataParams) => {
      if (newObj !== null) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier/${id}`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Mengupdate Supplier")
    },
    onError: () => {
      toast.error("Gagal Mengupdate Supplier !")
    },
  })
}

export const useGetSupplierProductById = () => {
  return useMutation<ApiSupplierResponse>({
    mutationKey: ["getSupplierById"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier/${newObj}`,
        )
        return response.data
      } else {
        return null
      }
    },
  })
}

export const useGetSupplierProduct = (queryparams?: {
  namaSupplier: string
}) => {
  return useQuery<ApiSupplierResponse>({
    queryKey: ["getSupplierProduct", queryparams?.namaSupplier],
    queryFn: async () => {
      const namaSupplier = queryparams?.namaSupplier || ""
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier?nama=${namaSupplier}`,
        {
          cache: "no-cache",
        },
      )
      return response.json()
    },
  })
}

export const useAddSupplier = () => {
  return useMutation({
    mutationKey: ["addSupplier"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Data Suppplier !")
    },
  })
}

export const useDeleteDataSupplier = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/produk/supplier/${id}`,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success("Berhasil Menghapus Data Supplier !")
    },
    onError: () => {},
  })
}

// transaksi

export const useGetDataTransaksi = (params?: { viewBy: string }) => {
  return useQuery<ApiTransaksi>({
    queryKey: ["getDataTransaksi"],
    queryFn: async () => {
      const transaksi = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/transaksi?page=1&view=${params?.viewBy}`,
        { cache: "no-cache" },
      )
      return transaksi.json()
    },
  })
}

export const useAddTransaksi = () => {
  return useMutation({
    mutationKey: ["addTransaksi"],
    mutationFn: async (newObj: any) => {
      if (newObj !== null) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/transaksi`,
          newObj,
        )
        return response.data
      } else {
        return null
      }
    },
    onSuccess: () => {
      toast.success("Berhasil Menambahkan Transaksi Ke Database !")
      window.location.reload()
    },
    onError: () => {
      toast.error("Gagal Menambahkan Transaksi Ke Database !")
    },
  })
}

// Laporan produk

export const useGetLaporanPejualan = (queryparams?: {
  startDate: number
  endDate: string
}) => {
  return useQuery<ApiPenjualanLaporanResponse>({
    queryKey: ["getPenjualan", queryparams?.startDate, queryparams?.endDate],
    queryFn: async () => {
      const startDate = queryparams?.startDate ?? ""
      const endDate = queryparams?.endDate ?? 0
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/main/laporan?gte=${startDate}&lt=${endDate}`,
        {
          cache: "no-cache",
        },
      )
      return response.json()
    },
  })
}
