import { create } from "zustand";

interface DeleteProjectDialogStore {
  isOpen: boolean;
  projectIds: string[];
  onOpen: (projectIds: string[]) => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useDeleteProjectDialogStore = create<DeleteProjectDialogStore>(
  (set) => ({
    isOpen: false,
    projectIds: [],
    onOpen: (projectIds) => set({ isOpen: true, projectIds }),
    onClose: () => set({ isOpen: false, projectIds: [] }),
    onOpenChange: (open) =>
      set((state) => ({
        isOpen: open,
        projectIds: open ? state.projectIds : [],
      })),
  }),
);
