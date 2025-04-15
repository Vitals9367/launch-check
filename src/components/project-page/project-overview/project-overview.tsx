"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@/server/db/schema/projects";
import { api } from "@/trpc/react";
import { SecurityGauge } from "./security-gauge";
import { VulnerabilityChart } from "./vulnerability-chart";
import ProjectOverviewSkeleton from "./project-overview-skeleton";

interface ProjectOverviewProps {
  project: Project;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const { data: stats, isLoading } = api.projects.getStats.useQuery({
    projectId: project.id,
  });

  if (isLoading) {
    return <ProjectOverviewSkeleton />;
  }

  if (!stats) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>No data available</CardTitle>
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
            <SecurityGauge stats={stats} />

            {/* Vulnerability Overview */}
            <div className="col-span-2 flex flex-col space-y-6 border-l border-gray-200 pl-8">
              <VulnerabilityChart stats={stats} />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
