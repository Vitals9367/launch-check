"use client";

import { useState, useEffect } from "react";
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
import { useRouter, useParams } from "next/navigation";
import { useCreateLinkDialogStore } from "@/store/use-create-link-dialog-store";

export function CreateLinkDialog() {
  const { isOpen, onOpen, onClose, onOpenChange } = useCreateLinkDialogStore();

  const [path, setPath] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectTargetUrl, setProjectTargetUrl] = useState("");

  const router = useRouter();
  const params = useParams();
  const utils = api.useUtils();

  // Get current project ID from URL params
  useEffect(() => {
    if (params.projectId) {
      setProjectId(params.projectId as string);
    }
  }, [params.projectId]);

  // Fetch project details to get the target URL
  const { data: projectData } = api.projects.getById.useQuery(
    { id: projectId },
    { enabled: !!projectId },
  );

  // Update target URL when project data is loaded
  useEffect(() => {
    if (projectData?.targetUrl) {
      setProjectTargetUrl(projectData.targetUrl);
    }
  }, [projectData]);

  const createLink = api.links.create.useMutation({
    onSuccess: async () => {
      // Invalidate links query to trigger a refresh
      await utils.links.fetchByProject.invalidate({ projectId });
      // Close dialog and reset form
      onOpenChange(false);
      setPath("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path.trim() || !projectId.trim() || !projectTargetUrl) {
      return;
    }

    // Ensure path starts with a slash
    const formattedPath = path.trim().startsWith("/")
      ? path.trim()
      : `/${path.trim()}`;

    // Combine project target URL with the path
    const fullUrl = new URL(formattedPath, projectTargetUrl).toString();

    createLink.mutate({
      url: fullUrl,
      projectId: projectId.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Add a new path to track for your project
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-path">Path</Label>
            <div className="flex items-center space-x-2">
              <div className="truncate text-sm text-gray-500">
                {projectTargetUrl || "Loading..."}
              </div>
              <Input
                id="link-path"
                placeholder="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                required
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter only the path part (e.g., /about or /products/123)
            </p>
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
              disabled={createLink.isPending || !projectTargetUrl}
            >
              {createLink.isPending ? "Creating..." : "Create Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
