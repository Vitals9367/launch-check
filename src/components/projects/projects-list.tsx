"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ProjectsLoading } from "./projects-loading";
import { ProjectsEmpty } from "./projects-empty";
import { SelectableItem } from "@/components/ui/selectable-item";
import { useState } from "react";
import { ProjectItem } from "../project-card/project-item";

export function ProjectsList() {
  const { data: projects, isLoading } = api.projects.fetchWithStats.useQuery();
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(
    new Set(),
  );

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjects((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(projectId)) {
        newSelection.delete(projectId);
      } else {
        newSelection.add(projectId);
      }
      return newSelection;
    });
  };

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (!projects?.length) {
    return <ProjectsEmpty />;
  }

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="grid w-full grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const isSelected = selectedProjects.has(project.id);
          return (
            <SelectableItem
              key={project.id}
              onSelect={() => handleProjectSelect(project.id)}
              isSelected={isSelected}
            >
              <ProjectItem project={project} isSelected={isSelected} />
            </SelectableItem>
          );
        })}
      </CardContent>
    </Card>
  );
}
