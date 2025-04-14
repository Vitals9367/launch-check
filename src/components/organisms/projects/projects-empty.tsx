"use client";

import { Folder, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateProjectDialogStore } from "@/store/use-create-project-dialog-store";

export function ProjectsEmpty() {
  const { onOpen } = useCreateProjectDialogStore();

  return (
    <div className="p-8 text-center">
      <Folder className="mx-auto mb-3 h-12 w-12 text-gray-300" />
      <h3 className="font-medium text-gray-900">No projects yet</h3>
      <p className="mt-1 text-gray-500">
        Create your first project to start managing website security
      </p>
      <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={onOpen}>
        <Plus className="mr-2 h-4 w-4" />
        Create First Project
      </Button>
    </div>
  );
}
