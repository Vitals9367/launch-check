import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/server/db/schema/projects";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table } from "lucide-react";

interface RecentScansProps {
  project: Project;
}

export function RecentScans({ project }: RecentScansProps) {
  // This would be replaced with actual scan data from your database
  const recentScans = [
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
      status: "Completed",
      vulnerabilities: {
        critical: 3,
        high: 7,
        medium: 10,
        low: 15,
      },
      duration: "42m",
    },
    {
      id: 3,
      date: "2024-03-05",
      status: "Failed",
      vulnerabilities: null,
      duration: "5m",
    },
  ];

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
            {recentScans.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell>
                  {new Date(scan.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      scan.status === "Completed" ? "default" : "destructive"
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
