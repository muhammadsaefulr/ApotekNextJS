import { create } from "zustand"

interface authUser {
    dataUser?: any
    setDataUser: (data: any) => void
}

export const useStoreDataAuth = create<authUser>((set) =>({
    setDataUser: (data?: any) => set({dataUser: data}) 
}))