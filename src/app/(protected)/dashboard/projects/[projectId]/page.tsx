import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectOverview } from "@/components/project/project-overview";
import { FindingsSection } from "@/components/findings/findings-section";
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
    <div className="space-y-8">
      <ProjectHeader project={project} />
      <ProjectOverview project={project} />
      <FindingsSection projectId={projectId} project={project} />
    </div>
  );
}
