"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateProjectDialogStore } from "@/store/use-create-project-dialog-store";

export function ProjectsHeader() {
  const { onOpen } = useCreateProjectDialogStore();

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500">Manage your security projects</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button className="bg-red-600 hover:bg-red-700" onClick={onOpen}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
}
