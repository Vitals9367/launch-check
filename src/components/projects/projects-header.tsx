"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateProjectDialogStore } from "@/store/use-create-project-dialog-store";
import { useDeleteProjectDialogStore } from "@/store/use-delete-project-dialog-store";
import { useProjectsStore } from "@/store/use-projects-store";

export function ProjectsHeader() {
  const { onOpen: openCreateDialog } = useCreateProjectDialogStore();
  const { onOpen: openDeleteDialog } = useDeleteProjectDialogStore();
  const selectedProjects = useProjectsStore((state) => state.selectedProjects);

  const handleDeleteSelected = () => {
    openDeleteDialog(Array.from(selectedProjects));
  };

  return (
    <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500">
          {selectedProjects.size > 0
            ? `${selectedProjects.size} project${selectedProjects.size === 1 ? "" : "s"} selected`
            : "Manage your security projects"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="text-red-600 hover:text-red-700"
          onClick={handleDeleteSelected}
          disabled={selectedProjects.size === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected ({selectedProjects.size})
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={openCreateDialog}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
}
