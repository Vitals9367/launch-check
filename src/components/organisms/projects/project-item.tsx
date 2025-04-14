"use client";

import Link from "next/link";
import { Folder, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { type Project } from "@/server/db/schema/projects";
import { projectRoute } from "@/routes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectItemProps {
  project: Project;
}

// Mock scan statuses for demonstration
const mockScanStatuses = ["secure", "warning", "vulnerable"] as const;
type ScanStatus = (typeof mockScanStatuses)[number];

// Generate consistent mock data based on project id
function getMockScanData(projectId: string): {
  status: ScanStatus;
  vulnerabilities: number;
  lastScan: string;
} {
  // Use the last character of the ID to determine status (for demo purposes)
  const lastChar = projectId.slice(-1);
  const statusIndex =
    Math.abs(parseInt(lastChar, 16)) % mockScanStatuses.length;
  const status = mockScanStatuses[statusIndex] as ScanStatus;

  // Generate a consistent number of vulnerabilities based on status
  const vulnerabilities =
    status === "secure" ? 0 : status === "warning" ? 1 : 3;

  // Mock last scan time (for demo purposes)
  const lastScan = "2 hours ago";

  return {
    status,
    vulnerabilities,
    lastScan,
  };
}

export function ProjectItem({ project }: ProjectItemProps) {
  const { status, vulnerabilities, lastScan } = getMockScanData(project.id);

  const getStatusDetails = (status: ScanStatus) => {
    switch (status) {
      case "secure":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          text: "Secure",
          color: "text-green-700 bg-green-50",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          text: "Warning",
          color: "text-yellow-700 bg-yellow-50",
        };
      case "vulnerable":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
          text: "Vulnerable",
          color: "text-red-700 bg-red-50",
        };
    }
  };

  const statusDetails = getStatusDetails(status);

  return (
    <Link href={`${projectRoute}/${project.id}`}>
      <Card className="group h-full transition-all hover:border-blue-200 hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2">
                <Folder className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                {project.name}
              </h3>
            </div>
            <div className={cn("rounded-full px-3 py-1", statusDetails.color)}>
              <div className="flex items-center gap-1.5">
                {statusDetails.icon}
                <span className="text-sm font-medium">
                  {statusDetails.text}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                status === "secure"
                  ? "default"
                  : status === "warning"
                    ? "secondary"
                    : "destructive"
              }
            >
              {vulnerabilities} {vulnerabilities === 1 ? "issue" : "issues"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last scan: {lastScan}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
