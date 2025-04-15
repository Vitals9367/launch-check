"use client";

import { type Project } from "@/server/db/schema/projects";
import { CheckCircle2, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface ScanStatus {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const STATUS_STYLES: Record<string, ScanStatus> = {
  Completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  Failed: {
    label: "Failed",
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  "In Progress": {
    label: "In Progress",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: <Clock className="h-4 w-4" />,
  },
};

interface ScanResult {
  id: string;
  date: string;
  status: keyof typeof STATUS_STYLES;
  critical: number;
  high: number;
  medium: number;
  low: number;
  duration: string;
}

interface RecentScansProps {
  project: Project;
}

export function RecentScans({ project }: RecentScansProps) {
  const { toast } = useToast();

  const handleStartScan = () => {
    toast({
      title: "Scan started",
      description: "Scan is being started in the background",
    });
  };

  // Mock data - replace with actual data from your API
  const scans: ScanResult[] = [
    {
      id: "scan-1",
      date: "3/15/2024",
      status: "Completed",
      critical: 2,
      high: 5,
      medium: 8,
      low: 12,
      duration: "45m",
    },
    {
      id: "scan-2",
      date: "3/10/2024",
      status: "Failed",
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      duration: "7m",
    },
    {
      id: "scan-3",
      date: "3/5/2024",
      status: "Completed",
      critical: 1,
      high: 3,
      medium: 6,
      low: 9,
      duration: "38m",
    },
    {
      id: "scan-4",
      date: "3/1/2024",
      status: "In Progress",
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      duration: "Running...",
    },
  ];

  return (
    <div className="divide-y divide-gray-100">
      {scans.map((scan) => {
        const status = scan.status as keyof typeof STATUS_STYLES;
        const statusStyle = STATUS_STYLES[status];

        if (!statusStyle) return null;

        return (
          <Link
            key={scan.id}
            href={`/dashboard/projects/${project.id}/scans/${scan.id}`}
            className="block transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-1 items-center gap-3">
                <div className={cn("rounded-lg p-2", statusStyle.bgColor)}>
                  {statusStyle.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {scan.date}
                    </span>
                    <span className={cn("text-sm", statusStyle.color)}>
                      {statusStyle.label}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm">
                    {scan.critical > 0 && (
                      <span className="text-red-600">
                        {scan.critical} Critical
                      </span>
                    )}
                    {scan.high > 0 && (
                      <span className="text-orange-500">{scan.high} High</span>
                    )}
                    {scan.medium > 0 && (
                      <span className="text-yellow-500">
                        {scan.medium} Medium
                      </span>
                    )}
                    {scan.low > 0 && (
                      <span className="text-blue-500">{scan.low} Low</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-3 text-sm">
                  <span className="text-red-600">{scan.critical}</span>
                  <span className="text-orange-500">{scan.high}</span>
                  <span className="text-yellow-500">{scan.medium}</span>
                  <span className="text-blue-500">{scan.low}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
