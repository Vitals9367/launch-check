import type { Project } from "@/server/db/schema/projects";
import type { Scan } from "@/server/db/schema/scan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScanListItem } from "./scan-list-item";

interface RecentScansProps {
  scans: Scan[];
  projectMap: Map<string, Project>;
}

export function RecentScans({ scans, projectMap }: RecentScansProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>
          Latest security scans across your projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scans.length > 0 ? (
            <div className="space-y-4">
              {scans.map((scan) => (
                <ScanListItem
                  key={scan.id}
                  scan={scan}
                  project={projectMap.get(scan.projectId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-sm text-gray-500">No scans found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
