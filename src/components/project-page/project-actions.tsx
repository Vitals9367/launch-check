"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { type Project } from "@/server/db/schema/projects";
import { useProjectSettingsDialogStore } from "@/store/use-project-settings-store";
import { api } from "@/trpc/react";
import { Plus, Settings, File, Loader2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TRPCClientError } from "@trpc/client";
import { useScanLimitDialogStore } from "@/store/use-scan-limit-dialog-store";

interface ProjectActionsProps {
  project: Project;
}

const LIMIT_ERROR_CODES = ["LIMIT_EXCEEDED", "FORBIDDEN"];
const LIMIT_ERROR_MESSAGES = ["limit reached", "exceeded", "maximum scans"];

function isLimitError(error: unknown) {
  if (error instanceof TRPCClientError) {
    // Check if it's a TRPC error with a code
    const code = error.data?.code;
    if (code && LIMIT_ERROR_CODES.includes(code)) {
      return true;
    }
  }

  // Check the error message for limit-related keywords
  const message =
    error instanceof Error
      ? error.message.toLowerCase()
      : String(error).toLowerCase();
  return LIMIT_ERROR_MESSAGES.some((keyword) => message.includes(keyword));
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const { onOpen: onOpenSettings } = useProjectSettingsDialogStore();
  const { onOpen: onOpenLimitDialog } = useScanLimitDialogStore();
  const { toast } = useToast();
  const utils = api.useUtils();

  const { mutate: createScan, isPending: isScanPending } =
    api.scans.createScan.useMutation({
      onSuccess: async (newScan) => {
        // Update the cache with the new scan
        utils.scans.getScans.setData({ projectId: project.id }, (oldScans) => {
          if (!oldScans) return [newScan];
          return [newScan, ...oldScans];
        });

        toast({
          title: "Scan created successfully",
        });
      },
      onError: (error) => {
        if (isLimitError(error)) {
          onOpenLimitDialog();
        } else {
          toast({
            title: "Failed to create scan",
            description: error instanceof Error ? error.message : String(error),
            variant: "destructive",
          });
        }
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
      <Button variant="outline" onClick={() => onOpenSettings(project)}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  );
}
