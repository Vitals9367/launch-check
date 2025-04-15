"use client";

import { Button } from "@/components/ui/button";
import { type Project } from "@/server/db/schema/projects";
import { useProjectSettingsDialogStore } from "@/store/use-project-settings-store";
import { Plus, Settings, File } from "lucide-react";

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const { onOpen: onOpenSettings } = useProjectSettingsDialogStore();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        New Scan
      </Button>
      <Button variant="outline">
        <File className="mr-2 h-4 w-4" />
        Export Report as PDF
      </Button>
      <Button variant="outline" onClick={() => onOpenSettings(project)}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  );
}
