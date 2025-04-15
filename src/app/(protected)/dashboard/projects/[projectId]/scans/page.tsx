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
import { ProjectHeader } from "@/components/project/project-header";
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

// Mock data - replace with actual data from your API
const MOCK_SCANS = Array.from({ length: 10 }, (_, i) => ({
  date: new Date(2024, 2, 15 - i).toLocaleDateString(),
  status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Failed" : "In Progress",
  critical: i % 3 === 0 ? Math.floor(Math.random() * 3) : 0,
  high: i % 3 === 0 ? Math.floor(Math.random() * 5) : 0,
  medium: i % 3 === 0 ? Math.floor(Math.random() * 8) : 0,
  low: i % 3 === 0 ? Math.floor(Math.random() * 12) : 0,
  duration: i % 3 === 2 ? "Running..." : `${Math.floor(Math.random() * 60)}m`,
}));

export default async function ProjectScansPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await api.projects.getById({
    id: params.projectId,
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />

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
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="divide-y divide-gray-100">
            {MOCK_SCANS.map((scan, index) => {
              const status = scan.status as keyof typeof STATUS_STYLES;
              const statusStyle = STATUS_STYLES[status];

              if (!statusStyle) return null;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
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
                          <span className="text-orange-500">
                            {scan.high} High
                          </span>
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{scan.duration}</span>
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
