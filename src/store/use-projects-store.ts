import { create } from "zustand";

interface ProjectsStore {
  selectedProjects: Set<string>;
  setSelectedProjects: (projects: Set<string>) => void;
  addSelectedProject: (projectId: string) => void;
  removeSelectedProject: (projectId: string) => void;
  clearSelectedProjects: () => void;
}

export const useProjectsStore = create<ProjectsStore>((set) => ({
  selectedProjects: new Set<string>(),
  setSelectedProjects: (projects) =>
    set({ selectedProjects: new Set(projects) }),
  addSelectedProject: (projectId) =>
    set((state) => {
      const newSet = new Set(state.selectedProjects);
      newSet.add(projectId);
      return { selectedProjects: newSet };
    }),
  removeSelectedProject: (projectId) =>
    set((state) => {
      const newSet = new Set(state.selectedProjects);
      newSet.delete(projectId);
      return { selectedProjects: newSet };
    }),
  clearSelectedProjects: () => set({ selectedProjects: new Set() }),
}));
