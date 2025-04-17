import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Scan } from "@/server/db/schema/scan";

const STATUS_STYLES = {
  in_progress: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
} as const;

interface ScanItemProps {
  scan: Scan;
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
  } = scan;

  const statusStyle = STATUS_STYLES[status];
  if (!statusStyle) return null;

  const duration = completedAt
    ? formatDuration(
        new Date(completedAt).getTime() - new Date(startedAt).getTime(),
      )
    : "Running...";

  return (
    <Link
      href={`/dashboard/projects/${projectId}/scans/${id}`}
      className="block hover:bg-gray-50"
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className={statusStyle.className}>
              {statusStyle.label}
            </Badge>
            <p className="text-sm text-gray-500">
              Started {new Date(startedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Duration: {duration}</p>
          </div>
          <div className="flex items-center space-x-2">
            <SeverityCount
              label="Critical"
              count={criticalCount}
              className="bg-red-50 text-red-700"
            />
            <SeverityCount
              label="High"
              count={highCount}
              className="bg-orange-50 text-orange-700"
            />
            <SeverityCount
              label="Medium"
              count={mediumCount}
              className="bg-yellow-50 text-yellow-700"
            />
            <SeverityCount
              label="Low"
              count={lowCount}
              className="bg-blue-50 text-blue-700"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function SeverityCount({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className?: string;
}) {
  return (
    <Badge variant="secondary" className={className}>
      {count} {label}
    </Badge>
  );
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "< 1m";
  return `${minutes}m`;
}
