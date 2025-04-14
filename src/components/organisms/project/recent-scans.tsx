import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/server/db/schema/projects";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

interface RecentScansProps {
  project: Project | undefined;
}

type ScanStatus = "Completed" | "Failed" | "In Progress";

interface ScanData {
  id: number;
  date: string;
  status: ScanStatus;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  } | null;
  duration: string;
}

// Mock data for recent scans
const MOCK_SCANS: ScanData[] = [
  {
    id: 1,
    date: "2024-03-15",
    status: "Completed",
    vulnerabilities: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 12,
    },
    duration: "45m",
  },
  {
    id: 2,
    date: "2024-03-10",
    status: "Failed",
    vulnerabilities: null,
    duration: "7m",
  },
  {
    id: 3,
    date: "2024-03-05",
    status: "Completed",
    vulnerabilities: {
      critical: 1,
      high: 3,
      medium: 6,
      low: 9,
    },
    duration: "38m",
  },
  {
    id: 4,
    date: "2024-03-01",
    status: "In Progress",
    vulnerabilities: null,
    duration: "Running...",
  },
];

export function RecentScans({ project }: RecentScansProps) {
  if (!project) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Critical</TableHead>
              <TableHead>High</TableHead>
              <TableHead>Medium</TableHead>
              <TableHead>Low</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_SCANS.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell>
                  {new Date(scan.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      scan.status === "Completed"
                        ? "default"
                        : scan.status === "In Progress"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {scan.status}
                  </Badge>
                </TableCell>
                <TableCell>{scan.vulnerabilities?.critical ?? "-"}</TableCell>
                <TableCell>{scan.vulnerabilities?.high ?? "-"}</TableCell>
                <TableCell>{scan.vulnerabilities?.medium ?? "-"}</TableCell>
                <TableCell>{scan.vulnerabilities?.low ?? "-"}</TableCell>
                <TableCell>{scan.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
