"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useCreateProjectDialogStore } from "@/store/use-create-project-dialog-store";
import type { Project } from "@/server/db/schema/projects";

export function CreateProjectDialog() {
  const { isOpen, onOpen, onClose, onOpenChange } =
    useCreateProjectDialogStore();

  const [projectName, setProjectName] = useState("");
  const [targetUrl, setTargetUrl] = useState("");

  const router = useRouter();
  const utils = api.useUtils();

  const createProject = api.projects.create.useMutation({
    onSuccess: async (newProject: Project) => {
      // Invalidate projects query to trigger a refresh
      await utils.projects.fetch.invalidate();
      // Close dialog and reset form
      onOpenChange(false);
      setProjectName("");
      setTargetUrl("");
      // Redirect to the new project's page
      router.push(`/dashboard/projects/${newProject.id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !targetUrl.trim()) {
      return;
    }

    createProject.mutate({
      name: projectName.trim(),
      targetUrl: targetUrl.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to organize your security scans
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="My Project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-url">Target URL</Label>
            <Input
              id="target-url"
              placeholder="My Website URL"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
              disabled={createProject.isPending}
            >
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
