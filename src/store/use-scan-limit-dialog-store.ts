import { create } from "zustand";

interface ScanLimitDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useScanLimitDialogStore = create<ScanLimitDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
