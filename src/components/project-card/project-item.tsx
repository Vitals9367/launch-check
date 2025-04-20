import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { projectRoute } from "@/routes";
import { ProjectHeader } from "./project-header";
import { ProjectFooter } from "./project-footer";
import { getStatusConfig } from "./status-config";
import type { ProjectWithStats } from "@/types/project";

interface ProjectItemProps {
  project: ProjectWithStats;
  isSelected?: boolean;
}

export function ProjectItem({ project, isSelected = false }: ProjectItemProps) {
  const statusDetails = getStatusConfig(project.scanData.status);

  const cardClassName = cn(
    // Base styles
    "group h-full transition-all",

    // Conditional styles based on selection state
    isSelected
      ? {
          // Selected state
          "border-blue-500": true,
          "bg-blue-50": true,
          "ring-2": true,
          "ring-blue-500/20": true,
          "shadow-md": true,
        }
      : {
          // Default hover state
          "hover:border-blue-200": true,
          "hover:shadow-md": true,
          "hover:bg-blue-50/50": true,
        },
  );

  return (
    <Link href={`${projectRoute}/${project.id}`} className="block h-full">
      <Card className={cardClassName}>
        <CardContent className="p-6">
          <ProjectHeader
            name={project.name}
            isSelected={isSelected}
            statusDetails={statusDetails}
          />
          <div className="flex items-center gap-2">
            <Badge variant={statusDetails.variant}>
              {project.scanData.vulnerabilities}{" "}
              {project.scanData.vulnerabilities === 1 ? "issue" : "issues"}
            </Badge>
          </div>
        </CardContent>
        <ProjectFooter
          lastScan={project.scanData.lastScan}
          isSelected={isSelected}
        />
      </Card>
    </Link>
  );
}
