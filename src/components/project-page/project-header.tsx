import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type Project } from "@/server/db/schema/projects";
import { projectRoute } from "@/routes";
import { ProjectActions } from "./project-actions";

interface ProjectHeaderProps {
  project: Project;
}

export async function ProjectHeader({ project }: ProjectHeaderProps) {
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
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>
              Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
            {project.targetUrl && (
              <span className="flex items-center">
                <span className="mr-1">•</span>
                <Link
                  href={project.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 hover:underline"
                >
                  {project.targetUrl.replace(/^https?:\/\//, "")}
                </Link>
              </span>
            )}
          </div>
        </div>
      </div>
      <ProjectActions project={project} />
    </div>
  );
}
