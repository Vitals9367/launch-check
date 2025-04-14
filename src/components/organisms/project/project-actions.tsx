"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Project } from "@/server/db/schema/projects";
import { useDeleteProjectDialogStore } from "@/store/use-delete-project-dialog-store";

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const { onOpen } = useDeleteProjectDialogStore();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">Settings</Button>
      <Button
        variant="outline"
        className="text-red-600 hover:text-red-700"
        onClick={() => onOpen([project.id])}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Project
      </Button>
    </div>
  );
}
