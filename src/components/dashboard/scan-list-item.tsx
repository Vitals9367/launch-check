import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import type { Scan } from "@/server/db/schema/scan";
import type { Project } from "@/server/db/schema/projects";

interface ScanListItemProps {
  scan: Scan;
  project: Project | undefined;
}

export function ScanListItem({ scan, project }: ScanListItemProps) {
  return (
    <Link
      href={`/dashboard/projects/${scan.projectId}/scans/${scan.id}`}
      className="group block"
    >
      <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-all duration-200 ease-in-out group-hover:bg-white group-hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-2 transition-all duration-200 ease-in-out group-hover:bg-blue-50 group-hover:text-blue-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                {project?.name}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-sm text-gray-600">
                {scan.totalFindings} findings
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <p>{project?.targetUrl}</p>
              <span>•</span>
              <p>
                {new Date(scan.startedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-1">
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
        </div>
      </div>
    </Link>
  );
}
