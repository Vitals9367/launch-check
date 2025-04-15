import ScanFinding from "./scan-finding";
import { Vulnerability } from "@/server/routers/scans";

interface ScanFindingsListProps {
  vulnerabilities: Vulnerability[];
}

export function ScanFindingsList({ vulnerabilities }: ScanFindingsListProps) {
  if (!vulnerabilities || vulnerabilities.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-sm text-gray-500">No vulnerabilities found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vulnerabilities.map((vulnerability) => (
        <ScanFinding {...vulnerability} />
      ))}
    </div>
  );
}
