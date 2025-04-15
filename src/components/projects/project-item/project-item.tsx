import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { projectRoute } from "@/routes";
import { ProjectHeader } from "./project-header";
import { ProjectFooter } from "./project-footer";
import { useScanData } from "./use-scan-data";
import type { ProjectItemProps } from "./types";

export function ProjectItem({ project, isSelected = false }: ProjectItemProps) {
  const { scanData, statusDetails } = useScanData(project.id);

  return (
    <Link href={`${projectRoute}/${project.id}`} className="block h-full">
      <Card
        className={cn(
          "group h-full transition-all",
          isSelected
            ? [
                "border-blue-500",
                "bg-blue-50",
                "ring-2",
                "ring-blue-500/20",
                "shadow-md",
              ]
            : [
                "hover:border-blue-200",
                "hover:shadow-md",
                "hover:bg-blue-50/50",
              ],
        )}
      >
        <CardContent className="p-6">
          <ProjectHeader
            name={project.name}
            isSelected={isSelected}
            statusDetails={statusDetails}
          />
          <div className="flex items-center gap-2">
            <Badge variant={statusDetails.variant}>
              {scanData.vulnerabilities}{" "}
              {scanData.vulnerabilities === 1 ? "issue" : "issues"}
            </Badge>
          </div>
        </CardContent>
        <ProjectFooter lastScan={scanData.lastScan} isSelected={isSelected} />
      </Card>
    </Link>
  );
}
