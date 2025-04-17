import { ScanFinding as ScanFindingType } from "@/server/db/schema/scan-finding";
import ScanFinding from "./scan-finding";

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

  return (
    <div className="space-y-4">
      {vulnerabilities.map((vulnerability) => (
        <ScanFinding
          key={vulnerability.id}
          finding={vulnerability}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
