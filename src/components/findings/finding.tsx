import { cn } from "@/lib/utils";
import { AlertTriangle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

type Severity = "critical" | "high" | "medium" | "low";

interface ScanFindingProps {
  id: string;
  name: string;
  severity: Severity;
  location: string;
  detectedAt: string;
  scanId: string;
  projectId: string;
  remediation?: string;
  effort?: "low" | "medium" | "high";
  completionPercentage?: number;
  documentationUrl?: string;
}

export default function ScanFinding({
  id,
  name,
  severity,
  location,
  detectedAt,
  projectId,
  remediation,
  effort,
  completionPercentage,
  documentationUrl,
  scanId,
}: ScanFindingProps) {
  const severityColors = {
    critical: "text-red-600 bg-red-50",
    high: "text-orange-500 bg-orange-50",
    medium: "text-yellow-500 bg-yellow-50",
    low: "text-blue-500 bg-blue-50",
  };

  const effortColors = {
    low: "bg-green-50 text-green-700",
    medium: "bg-yellow-50 text-yellow-700",
    high: "bg-red-50 text-red-700",
  };

  return (
    <Link
      href={`/dashboard/projects/${projectId}/scans/${scanId}/findings/${id}`}
      className="block py-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-start gap-3">
          <div className={cn("rounded-lg p-2", severityColors[severity])}>
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{detectedAt}</span>
        </div>
      </div>
      <div className="ml-9 space-y-2">
        {remediation && (
          <div className="text-sm text-gray-600">
            <strong>Remediation:</strong> {remediation}
          </div>
        )}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {effort && (
            <div>
              <strong>Effort:</strong>{" "}
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  effortColors[effort],
                )}
              >
                {effort}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
