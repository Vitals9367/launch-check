import { ScanFinding as ScanFindingType } from "@/server/db/schema/scan-finding";
import ScanFinding from "./scan-finding";

// Severity order mapping for consistent sorting
const SEVERITY_ORDER = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
} as const;

interface ScanFindingsListProps {
  vulnerabilities: ScanFindingType[];
  projectId: string;
}

export function ScanFindingsList({
  vulnerabilities,
  projectId,
}: ScanFindingsListProps) {
  if (!vulnerabilities || vulnerabilities.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-sm text-gray-500">No vulnerabilities found</p>
      </div>
    );
  }

  // Sort vulnerabilities by severity
  const sortedVulnerabilities = [...vulnerabilities].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return (
    <div className="space-y-4">
      {sortedVulnerabilities.map((vulnerability) => (
        <ScanFinding
          key={vulnerability.id}
          finding={vulnerability}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
