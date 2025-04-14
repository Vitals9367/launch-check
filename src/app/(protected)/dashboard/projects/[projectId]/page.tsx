import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/organisms/project/project-header";
import { ProjectOverview } from "@/components/organisms/project/project-overview";
import { RecentScans } from "@/components/organisms/project/recent-scans";
import { api } from "@/trpc/server";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  const project = await api.projects.getById({
    id: projectId,
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
