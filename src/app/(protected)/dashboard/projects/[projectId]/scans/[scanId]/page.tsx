import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertOctagon, Clock, ArrowLeft, File } from "lucide-react";
import { ScanFindingsList } from "@/components/scan-findings/scan-findings-list";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";

const statusColors = {
  pending: "bg-blue-50 text-blue-700",
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-700",
};

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  failed: "Failed",
};

export default async function ScanPage({
  params,
}: {
  params: Promise<{ projectId: string; scanId: string }>;
}) {
  const { projectId, scanId } = await params;

  const scan = await api.scans.getById({
    projectId: projectId as string,
    scanId: scanId as string,
  });

  if (!scan) {
    notFound();
  }

  const vulnerabilities = await api.findings.getByScanId({
    scanId: scan.id,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/dashboard/projects" },
            { label: "Project", href: `/dashboard/projects/${projectId}` },
            {
              label: "Scan",
              href: `/dashboard/projects/${projectId}/scans/${scanId}`,
            },
          ]}
        />
        {/* <Button variant="outline">
          <File className="mr-2 h-4 w-4" />
          Export Report as PDF
        </Button> */}
      </div>

      <div className="grid gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>Scan Details</span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    statusColors[scan.status]
                  }`}
                >
                  {statusLabels[scan.status]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                Started {new Date(scan.startedAt).toLocaleString()}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-2xl font-semibold">
                  {scan.totalFindings}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                <div className="text-2xl font-semibold text-red-700">
                  {scan.criticalCount}
                </div>
                <div className="text-sm text-red-700">Critical</div>
              </div>
              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-center">
                <div className="text-2xl font-semibold text-orange-700">
                  {scan.highCount}
                </div>
                <div className="text-sm text-orange-700">High</div>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
                <div className="text-2xl font-semibold text-yellow-700">
                  {scan.mediumCount}
                </div>
                <div className="text-sm text-yellow-700">Medium</div>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                <div className="text-2xl font-semibold text-blue-700">
                  {scan.lowCount}
                </div>
                <div className="text-sm text-blue-700">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <Tabs defaultValue="findings" className="w-full">
              <div className="mb-4 flex items-center justify-between">
                <TabsList>
                  <TabsTrigger
                    value="findings"
                    className="flex items-center gap-2"
                  >
                    <AlertOctagon className="h-4 w-4" />
                    Findings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="findings" className="mt-0">
                <ScanFindingsList
                  vulnerabilities={vulnerabilities}
                  projectId={projectId}
                />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
