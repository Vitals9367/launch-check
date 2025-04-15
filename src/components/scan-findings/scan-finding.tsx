import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, FileCode } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Severity = "critical" | "high" | "medium" | "low";

interface ScanFindingProps {
  id: string;
  title: string;
  severity: Severity;
  location: string;
  detectedAt: string;
  scanId: string;
  projectId: string;
  description?: string;
}

export default function ScanFinding({
  id,
  title,
  severity,
  location,
  detectedAt,
  projectId,
  description,
  scanId,
}: ScanFindingProps) {
  const severityColors = {
    critical: {
      badge: "border-red-200 bg-red-50 text-red-700",
      icon: "text-red-600",
    },
    high: {
      badge: "border-orange-200 bg-orange-50 text-orange-700",
      icon: "text-orange-500",
    },
    medium: {
      badge: "border-yellow-200 bg-yellow-50 text-yellow-700",
      icon: "text-yellow-500",
    },
    low: {
      badge: "border-blue-200 bg-blue-50 text-blue-700",
      icon: "text-blue-500",
    },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <TooltipProvider>
      <Link
        href={`/dashboard/projects/${projectId}/scans/${scanId}/findings/${id}`}
        className="block px-4 py-3 hover:bg-gray-50/80"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Tooltip>
              <TooltipTrigger>
                <AlertTriangle
                  className={cn("h-6 w-6", severityColors[severity].icon)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{severity} severity finding</p>
              </TooltipContent>
            </Tooltip>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">{title}</h4>
                <Badge
                  variant="outline"
                  className={cn("capitalize", severityColors[severity].badge)}
                >
                  {severity}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileCode className="h-3.5 w-3.5" />
                <span>{location}</span>
              </div>
              {description && (
                <p className="mt-1 text-sm text-gray-600">{description}</p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDate(detectedAt)}</span>
          </div>
        </div>
      </Link>
    </TooltipProvider>
  );
}
