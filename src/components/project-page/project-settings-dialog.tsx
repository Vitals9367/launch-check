"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Trash2 } from "lucide-react";
import { useProjectSettingsDialogStore } from "@/store/use-project-settings-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDeleteProjectDialogStore } from "@/store/use-delete-project-dialog-store";

interface ProjectSettingsDialogProps {
  projectId: string;
  projectName: string;
  scanFrequency?: "daily" | "weekly" | "monthly";
  notificationsEnabled?: boolean;
}

export function ProjectSettingsDialog() {
  const { isOpen, project, onClose, onOpenChange } =
    useProjectSettingsDialogStore();
  const { onOpen: onOpenDelete } = useDeleteProjectDialogStore();

  if (!project) return null;

  const handleDelete = () => {
    onOpenDelete(project.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Project Settings</DialogTitle>
          <DialogDescription className="text-gray-500">
            Configure your project settings and preferences.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Project Name
              </Label>
              <Input
                id="name"
                defaultValue={project?.name}
                placeholder="Enter project name"
                className={cn(
                  "h-10 px-3",
                  "border border-gray-200",
                  "focus:border-transparent focus:ring-2 focus:ring-blue-500",
                  "placeholder:text-gray-400",
                )}
              />
            </div>

            {/* Commented sections preserved for future implementation */}
            {/* <div className="space-y-2">
              <Label htmlFor="scan-frequency" className="text-sm font-medium">
                Scan Frequency
              </Label>
              <Select defaultValue={scanFrequency}>
                <SelectTrigger id="scan-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="notifications"
                defaultChecked={notificationsEnabled}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="notifications" className="text-sm font-medium">
                Enable notifications
              </Label>
            </div> */}
          </div>
        </div>

        <Separator className="my-5" />

        <DialogFooter className="flex-col gap-4 sm:flex-row">
          <Button
            variant="destructive"
            className="w-full justify-center gap-2 sm:w-1/2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Project
          </Button>
          <Button
            type="submit"
            className="w-full justify-center gap-2 bg-blue-600 hover:bg-blue-700 sm:w-1/2"
          >
            <Settings className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
