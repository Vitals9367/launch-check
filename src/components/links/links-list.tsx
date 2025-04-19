"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Pencil, Trash2, Plus, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { CreateLinkDialog } from "@/components/links/create-link-dialog";
import { useCreateLinkDialogStore } from "@/store/use-create-link-dialog-store";
import { LinksEmpty } from "@/components/links/links-empty";

interface ProjectLink {
  id: string;
  url: string;
}

export function LinksList() {
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editedUrl, setEditedUrl] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [projectLinks, setProjectLinks] = useState<ProjectLink[]>([]);

  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const utils = api.useUtils();

  const {
    data: fetchedLinks,
    isLoading,
    error,
  } = api.links.fetchByProject.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  useEffect(() => {
    if (fetchedLinks) {
      setProjectLinks(fetchedLinks);
    }
  }, [fetchedLinks]);

  const handleEditClick = (link: ProjectLink) => {
    setEditingLinkId(link.id);
    setEditedUrl(link.url);
  };

  const updateLink = api.links.update.useMutation({
    onSuccess: async () => {
      // Invalidate links query to trigger a refresh
      await utils.links.fetchByProject.invalidate({ projectId });
      // Refresh the page to update server components
      router.refresh();
      setEditingLinkId(null);
    },
    onError: (error) => {
      console.error("Failed to update link:", error);
      // Revert the local state change
      setProjectLinks(fetchedLinks || []);
      setEditingLinkId(null);
    },
  });

  const handleSaveEdit = (id: string) => {
    if (id && editedUrl) {
      updateLink.mutate({
        id,
        url: editedUrl,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingLinkId(null);
  };

  const handleDeleteClick = (id: string) => {
    setLinkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteLink = api.links.delete.useMutation({
    onSuccess: async () => {
      // Invalidate links query to trigger a refresh
      await utils.links.fetchByProject.invalidate({ projectId });
      // Refresh the page to update server components
      router.refresh();
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    },
    onError: (error) => {
      console.error("Failed to delete link:", error);
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    },
  });

  const confirmDelete = () => {
    if (linkToDelete) {
      deleteLink.mutate({ id: linkToDelete });
    }
  };

  const { onOpen } = useCreateLinkDialogStore();

  const handleAddLink = () => {
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-sm text-gray-500">Loading links...</p>
      </div>
    );
  }

  if (!projectLinks || projectLinks.length === 0) {
    return (
      <>
        <LinksEmpty />
        <CreateLinkDialog />
      </>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="sm"
        className="mt-1 w-full justify-center gap-2 border-dashed text-gray-500 hover:text-gray-700"
        onClick={handleAddLink}
      >
        <Plus className="h-4 w-4" />
        Add Project Link
      </Button>

      {projectLinks.map((link) => (
        <div
          key={link.id}
          className="flex items-center justify-between rounded-md border border-gray-100 px-4 py-3"
        >
          <div className="w-full">
            <div className="flex items-center gap-2">
              {editingLinkId === link.id ? (
                <div className="flex w-full items-center gap-2">
                  <Input
                    value={editedUrl}
                    onChange={(e) => setEditedUrl(e.target.value)}
                    className="h-8"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSaveEdit(link.id)}
                    className="h-8"
                    disabled={updateLink.isPending}
                  >
                    {updateLink.isPending ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="h-8"
                    disabled={updateLink.isPending}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <p
                  className="cursor-pointer text-sm text-gray-600 hover:text-blue-600"
                  onClick={() =>
                    window.open(link.url, "_blank", "noopener,noreferrer")
                  }
                >
                  {link.url}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {editingLinkId !== link.id && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500"
                  onClick={() => handleEditClick(link)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500"
                  onClick={() => handleDeleteClick(link.id)}
                  disabled={deleteLink.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </>
            )}
          </div>
        </div>
      ))}

      <CreateLinkDialog />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this project link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteLink.isPending}
            >
              {deleteLink.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
