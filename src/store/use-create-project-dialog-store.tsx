import { create } from "zustand";

type CreateProjectDialogStore = {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onOpenChange(open: boolean): void;
};

export const useCreateProjectDialogStore = create<CreateProjectDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
  }),
);
