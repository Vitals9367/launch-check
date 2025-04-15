"use client";

import { useRouter } from "next/navigation";
import { projectRoute } from "@/routes";
import { api } from "@/trpc/react";
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
import { useDeleteProjectDialogStore } from "@/store/use-delete-project-dialog-store";
import { useProjectsStore } from "@/store/use-projects-store";

export function DeleteProjectDialog() {
  const router = useRouter();
  const utils = api.useUtils();
  const { isOpen, projectIds, onOpenChange } = useDeleteProjectDialogStore();
  const clearSelectedProjects = useProjectsStore(
    (state) => state.clearSelectedProjects,
  );

  const deleteProject = api.projects.delete.useMutation({
    onSuccess: async () => {
      await utils.projects.fetch.invalidate();
    },
  });

  const handleDelete = async () => {
    if (projectIds.length === 0) return;

    // Delete all selected projects
    await Promise.all(
      projectIds.map((id) => deleteProject.mutateAsync({ id })),
    );

    // Close dialog and clear selection
    onOpenChange(false);
    clearSelectedProjects();
    router.push(projectRoute);
  };

  const projectCount = projectIds.length;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {projectCount === 1 ? "Project" : `${projectCount} Projects`}
            ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected
            {projectCount === 1 ? " project" : " projects"} and all associated
            scan data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete {projectCount === 1 ? "Project" : "Projects"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
