import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityGauge } from "./security-gauge";
import { VulnerabilityChart } from "./vulnerability-chart";
import type { ProjectWithStats } from "@/types/project";
import { api } from "@/trpc/server";

interface ProjectOverviewProps {
  project: ProjectWithStats;
}

export async function ProjectOverview({ project }: ProjectOverviewProps) {
  const { scanData } = project;

  // Fetch project scans for the chart
  const scans = await api.scans.getScans({
    projectId: project.id,
  });

  // If no scan data is available
  if (!scanData.lastScan) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>No scan data available</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-3 gap-8">
            {/* Security Rating Gauge */}
            <SecurityGauge
              score={scanData.securityScore}
              rating={scanData.rating}
              vulnerabilities={scanData.vulnerabilityBreakdown}
            />

            {/* Vulnerability Overview */}
            <div className="col-span-2 flex flex-col space-y-6 border-l border-gray-200 pl-8">
              <VulnerabilityChart scans={scans} />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
