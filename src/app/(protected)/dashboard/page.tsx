import {
  AlertTriangle,
  Globe,
  AlertOctagon,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { api } from "@/trpc/server";
import {
  calculateScanTotals,
  calculateSecurityStats,
} from "@/utils/scan-calculations";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentScans } from "@/components/dashboard/recent-scans";
import type { ProjectWithStats } from "@/types/project";

export default async function DashboardPage() {
  // Fetch all projects with stats and latest scans
  const [projects, latestScans] = await Promise.all([
    api.projects.fetchWithStats() as Promise<ProjectWithStats[]>,
    api.scans.getLatestUserScans({ limit: 10 }),
  ]);

  // Calculate totals using our utility function
  const scanTotals = calculateScanTotals(latestScans);

  // Calculate additional metrics
  const criticalAndHighIssues = scanTotals.totalCritical + scanTotals.totalHigh;
  const avgIssuesPerScan =
    scanTotals.totalScans > 0
      ? Math.round(scanTotals.totalVulnerabilities / scanTotals.totalScans)
      : 0;

  // Create a map of project IDs to projects (with scan data) for quick lookup
  const projectMap = new Map<string, ProjectWithStats>(
    projects.map((project) => [project.id, project]),
  );

  const statsCards = [
    {
      label: "Projects",
      value: projects.length,
      icon: Globe,
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-50",
    },
    {
      label: "Critical & High Issues",
      value: criticalAndHighIssues,
      icon: AlertOctagon,
      iconColor: "text-red-500",
      iconBgColor: "bg-red-50",
    },
    {
      label: "Security Score",
      value:
        scanTotals.totalVulnerabilities > 0
          ? Math.round(
              (1 - criticalAndHighIssues / scanTotals.totalVulnerabilities) *
                100,
            )
          : 100,
      suffix: "%",
      icon: ShieldCheck,
      iconColor: "text-green-500",
      iconBgColor: "bg-green-50",
    },
    {
      label: "Avg Issues/Scan",
      value: avgIssuesPerScan,
      subtext: `${scanTotals.totalScans} total scans`,
      icon: Activity,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-50",
    },
  ];

  return (
    <div>
      {/* Dashboard Content */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Security Overview
          </h1>
          <p className="text-gray-500">
            Monitor and analyze your security status
          </p>
        </div>
      </div>

      {/* Stats overview */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {statsCards.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Recent Scans */}
      <RecentScans scans={latestScans} projectMap={projectMap} />
    </div>
  );
}
