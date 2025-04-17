"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type Project } from "@/server/db/schema/projects";
import { useProjectSettingsDialogStore } from "@/store/use-project-settings-store";
import { api } from "@/trpc/react";
import { Plus, Settings, File, Loader2 } from "lucide-react";

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const { onOpen: onOpenSettings } = useProjectSettingsDialogStore();
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: createScan, isPending: isScanPending } =
    api.scans.createScan.useMutation({
      onSuccess: async () => {
        await utils.scans.getScans.invalidate({ projectId: project.id });
        toast({
          title: "Scan created successfully",
        });
      },
      onError: () => {
        toast({
          title: "Failed to create scan",
        });
      },
    });

  const onNewScan = () => {
    createScan({ projectId: project.id });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={onNewScan}
        disabled={isScanPending}
        className="flex items-center gap-2"
      >
        {isScanPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Scan...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            New Scan
          </>
        )}
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
