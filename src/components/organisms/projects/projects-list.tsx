"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ProjectsLoading } from "./projects-loading";
import { ProjectsEmpty } from "./projects-empty";
import { ProjectItem } from "./project-item";

export function ProjectsList() {
  const { data: projects, isLoading } = api.projects.fetch.useQuery();

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (!projects?.length) {
    return <ProjectsEmpty />;
  }

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="grid w-full grid-cols-1 gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </CardContent>
    </Card>
  );
}
