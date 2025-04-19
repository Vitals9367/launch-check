"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, AlertOctagon, Loader2 } from "lucide-react";
import { ScanFindingsList } from "@/components/scan-findings/scan-findings-list";
import { ScanList } from "@/components/scans/scan-list";
import { Project } from "@/server/db/schema/projects";
import { api } from "@/trpc/react";
import { ScanFinding } from "@/server/db/schema/scan-finding";

interface FindingsSectionProps {
  project: Project;
}

export function FindingsSection({ project }: FindingsSectionProps) {
  const { data: scans, isFetching: isFetchingScans } =
    api.scans.getScans.useQuery(
      {
        projectId: project.id,
      },
      {
        // Refresh every 5 seconds
        refetchInterval: 5000,
      },
    );

  const scan = scans?.[0];

  const { data: vulnerabilities, isFetching: isFetchingVulnerabilities } =
    api.findings.getByScanId.useQuery(
      {
        scanId: scan?.id ?? "",
      },
      {
        enabled: !!scan,
      },
    );

  return (
    <section>
      <Card className="bg-white">
        <CardHeader>
          <Tabs defaultValue="scans" className="w-full">
            <TabsList className="mb-4 grid w-[400px] grid-cols-2">
              <TabsTrigger value="scans" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Scans
              </TabsTrigger>
              <TabsTrigger value="findings" className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4" />
                Latest Findings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="findings" className="mt-0">
              {isFetchingVulnerabilities && !vulnerabilities ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <ScanFindingsList
                  vulnerabilities={vulnerabilities ?? []}
                  projectId={project.id}
                />
              )}
            </TabsContent>

            <TabsContent value="scans" className="mt-0">
              {isFetchingScans && !scans ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <ScanList scans={scans ?? []} />
              )}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </section>
  );
}
