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

  const [url, setUrl] = useState("");
  const [projectId, setProjectId] = useState("");

  const router = useRouter();
  const params = useParams();
  const utils = api.useUtils();

  // Get current project ID from URL params
  useEffect(() => {
    if (params.projectId) {
      setProjectId(params.projectId as string);
    }
  }, [params.projectId]);

  const createLink = api.links.create.useMutation({
    onSuccess: async () => {
      // Invalidate links query to trigger a refresh
      await utils.links.fetchByProject.invalidate({ projectId });
      // Close dialog and reset form
      onOpenChange(false);
      setUrl("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !projectId.trim()) {
      return;
    }

    createLink.mutate({
      url: url.trim(),
      projectId: projectId.trim(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Add a new link to your project for tracking
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="link-name">URL</Label>
            <Input
              id="link-name"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              disabled={createLink.isPending}
            >
              {createLink.isPending ? "Creating..." : "Create Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
