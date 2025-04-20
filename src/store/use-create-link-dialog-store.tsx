import { create } from "zustand";

type CreateLinkDialogStore = {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onOpenChange(open: boolean): void;
};

export const useCreateLinkDialogStore = create<CreateLinkDialogStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
  }),
);
