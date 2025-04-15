import { create } from "zustand";

type DeleteUserDialogStore = {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onOpenChange(open: boolean): void;
};

export const useDeleteUserDialogStore = create<DeleteUserDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
  }),
);
