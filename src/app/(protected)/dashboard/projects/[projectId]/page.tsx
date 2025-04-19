import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/project-page/project-header";
import { ProjectOverview } from "@/components/project-page/project-overview/project-overview";
import { FindingsSection } from "@/components/project-page/findings-scans-section";
import { api } from "@/trpc/server";

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  const project = await api.projects.getByIdWithStats({
    id: projectId,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      <ProjectOverview project={project} />
      <FindingsSection project={project} />
    </div>
  );
}
