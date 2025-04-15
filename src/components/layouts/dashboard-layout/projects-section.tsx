"use client";

import { FolderClosed, Folders, Plus } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { projectRoute } from "@/routes";
import { useCreateProjectDialogStore } from "@/store/use-create-project-dialog-store";
import { NavigationSection } from "./types";
import { getMockScanData, ProjectStatusIndicator } from "./project-status";

export function useProjectsSection(): NavigationSection {
  const { data: projects } = api.projects.fetch.useQuery();
  const params = useParams();
  const pathname = usePathname();
  const currentProjectId = params?.projectId as string | undefined;
  const { onOpen } = useCreateProjectDialogStore();

  return {
    title: "Projects",
    items: [
      {
        href: projectRoute,
        icon: Folders,
        label: "All Projects",
        isActive: pathname === projectRoute,
      },
      ...(projects?.map((project) => {
        const { status, vulnerabilities } = getMockScanData(project.id);
        return {
          href: `${projectRoute}/${project.id}`,
          icon: FolderClosed,
          label: project.name,
          isActive: project.id === currentProjectId,
          rightElement: (
            <ProjectStatusIndicator
              status={status}
              vulnerabilities={vulnerabilities}
            />
          ),
        };
      }) ?? []),
      {
        href: "#",
        icon: Plus,
        label: "New Project",
        onClick: onOpen,
      },
    ],
  };
}
