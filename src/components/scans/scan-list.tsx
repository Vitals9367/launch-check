import { ScanItem } from "./scan-item";
import { Scan } from "@/server/db/schema/scan";
interface ScanListProps {
  scans: Scan[];
}

export function ScanList({ scans }: ScanListProps) {
  if (!scans || scans.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-sm text-gray-500">No scans found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {scans.map((scan) => (
        <ScanItem key={scan.id} scan={scan} />
      ))}
    </div>
  );
}
