import { isArray } from "lodash";
import { create } from "zustand";

interface DeleteProjectDialogStore {
  isOpen: boolean;
  projectIds: string[];
  onOpen: (projectId: string | string[]) => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useDeleteProjectDialogStore = create<DeleteProjectDialogStore>(
  (set) => ({
    isOpen: false,
    projectIds: [],
    onOpen: (projectId) =>
      set({
        isOpen: true,
        projectIds: isArray(projectId) ? projectId : [projectId],
      }),
    onClose: () => set({ isOpen: false, projectIds: [] }),
    onOpenChange: (open) =>
      set((state) => ({
        isOpen: open,
        projectIds: open ? state.projectIds : [],
      })),
  }),
);
