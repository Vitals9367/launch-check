"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { ProjectsLoading } from "./projects-loading";
import { ProjectsEmpty } from "./projects-empty";
import { ProjectItem } from "./project-item";

export function ProjectsList() {
  const { data: projects, isLoading } = api.projects.fetch.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Projects</CardTitle>
        <CardDescription>
          View and manage your security scanning projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ProjectsLoading />
        ) : !projects?.length ? (
          <ProjectsEmpty />
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
