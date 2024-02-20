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
  ApiProductResponse,
  ApiSupplierResponse,
  BarangDataSubmit,
  Kategori,
  Supplier,
} from "../../types/next-api"

// Product Function
export const useGetProduct = (queryparams?: {
  kategori: number
  produk: string
}) => {
  return useQuery<ApiProductResponse>({
    queryKey: ["todos", queryparams?.kategori, queryparams?.produk],
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
      toast.success("Berhasil Menambahkan Produk !")
    },
  })
}

interface UpdateDataParams {
  id: number
  newObj: any
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
    queryKey: ["todos", queryparams?.namaSupplier],
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
