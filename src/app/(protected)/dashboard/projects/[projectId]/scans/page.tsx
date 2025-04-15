import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanStatus {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const STATUS_STYLES: Record<string, ScanStatus> = {
  completed: {
    label: "Completed",
    color: "text-green-600",
    bgColor: "bg-green-50",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  failed: {
    label: "Failed",
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: <Clock className="h-4 w-4" />,
  },
};

function calculateDuration(startedAt: string, completedAt?: string): string {
  const start = new Date(startedAt);
  const end = completedAt ? new Date(completedAt) : new Date();
  const durationMs = end.getTime() - start.getTime();
  const minutes = Math.floor(durationMs / (1000 * 60));

  if (!completedAt) {
    return "Running...";
  }

  return `${minutes}m`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default async function ProjectScansPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  const scans = await api.scans.getScans({
    projectId: projectId as string,
  });

  if (!scans) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold">Scan History</h1>
            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              Start New Scan
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input placeholder="Search scans..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="divide-y divide-gray-100">
            {scans.map((scan) => {
              const statusStyle = STATUS_STYLES[scan.status];
              const duration = calculateDuration(
                scan.startedAt,
                scan.completedAt,
              );

              if (!statusStyle) return null;

              return (
                <div
                  key={scan.id}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("rounded-lg p-2", statusStyle.bgColor)}>
                      {statusStyle.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {formatDate(scan.startedAt)}
                        </span>
                        <span className={cn("text-sm", statusStyle.color)}>
                          {statusStyle.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-sm">
                        {scan.summary.critical > 0 && (
                          <span className="text-red-600">
                            {scan.summary.critical} Critical
                          </span>
                        )}
                        {scan.summary.high > 0 && (
                          <span className="text-orange-500">
                            {scan.summary.high} High
                          </span>
                        )}
                        {scan.summary.medium > 0 && (
                          <span className="text-yellow-500">
                            {scan.summary.medium} Medium
                          </span>
                        )}
                        {scan.summary.low > 0 && (
                          <span className="text-blue-500">
                            {scan.summary.low} Low
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
