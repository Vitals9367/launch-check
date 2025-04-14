import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { ProjectHeader } from "@/components/organisms/project/project-header";
import { ProjectOverview } from "@/components/organisms/project/project-overview";
import { RecentScans } from "@/components/organisms/project/recent-scans";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await api.projects.getById({
    id: params.projectId,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      <ProjectOverview project={project} />
      <RecentScans project={project} />
    </div>
  );
}
