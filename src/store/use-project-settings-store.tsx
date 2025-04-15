import { Project } from "@/server/db/schema/projects";
import { create } from "zustand";

type ProjectSettingsDialogStore = {
  isOpen: boolean;
  onOpen(project: Project): void;
  onClose(): void;
  onOpenChange(open: boolean): void;
  project: Project | null;
};

export const useProjectSettingsDialogStore = create<ProjectSettingsDialogStore>(
  (set) => ({
    isOpen: false,
    project: null,
    onOpen: (project: Project) => set({ isOpen: true, project }),
    onClose: () => set({ isOpen: false, project: null }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
  }),
);
