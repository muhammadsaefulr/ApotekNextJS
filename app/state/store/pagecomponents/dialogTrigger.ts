import { create } from 'zustand';

interface DialogState {
  isOpen: boolean;
  value?: any; 
  openDialog: (data?: any) => void;
  closeDialog: () => void;
}

export const useDialogViewBarangStore = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: (data?: any) => set({ isOpen: true, value: data }),
  closeDialog: () => set({ isOpen: false }),
}));

export const useDialogAddBarangStore = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
