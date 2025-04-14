import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type Project } from "@/server/db/schema/projects";
import { projectRoute } from "@/routes";
import { api } from "@/trpc/server";
import { ProjectActions } from "./project-actions";

interface ProjectHeaderProps {
  project: Project;
}

export async function ProjectHeader({ project }: ProjectHeaderProps) {
  const scans = await api.scans.getLastScan({
    projectId: project.id,
  });

  return (
    <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-center gap-4">
        <Link href={projectRoute}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
            {scans?.lastScanDate && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  Last scan: {new Date(scans.lastScanDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProjectActions project={project} />
    </div>
  );
}
