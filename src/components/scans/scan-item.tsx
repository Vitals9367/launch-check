import Link from "next/link";
import { Scan } from "@/server/db/schema/scan";
import { ScanStatusBadge } from "./scan-status-badge";
import { ScanDuration } from "./scan-duration";
import { ScanSeverityCounts } from "./scan-severity-counts";

interface ScanItemProps {
  scan: Scan;
}

function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ScanItem({ scan }: ScanItemProps) {
  const {
    id,
    status,
    startedAt,
    completedAt,
    projectId,
    criticalCount,
    highCount,
    mediumCount,
    lowCount,
    errorMessage,
  } = scan;

  return (
    <Link
      href={`/dashboard/projects/${projectId}/scans/${id}`}
      className="block hover:bg-gray-50"
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ScanStatusBadge status={status} errorMessage={errorMessage} />
            <p className="text-sm text-gray-500">
              Started {formatDateTime(startedAt)}
            </p>
            <ScanDuration startedAt={startedAt} completedAt={completedAt} />
          </div>
          <ScanSeverityCounts
            counts={{
              critical: criticalCount,
              high: highCount,
              medium: mediumCount,
              low: lowCount,
            }}
          />
        </div>
      </div>
    </Link>
  );
}
