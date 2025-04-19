import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, AlertOctagon, Link as LinkIcon } from "lucide-react";
import { ScanFindingsList } from "@/components/scan-findings/scan-findings-list";
import { ScanList } from "@/components/scans/scan-list";
import { LinksList } from "@/components/scans/links-list";
import { Project } from "@/server/db/schema/projects";
import { api } from "@/trpc/server";
import { Vulnerability } from "@/server/mocks/scans";
interface FindingsSectionProps {
  project: Project;
}

export async function FindingsSection({ project }: FindingsSectionProps) {
  const scans = await api.scans.getScans({
    projectId: project.id,
  });

  const scan = scans?.[0];
  let vulnerabilities: Vulnerability[] = [];

  if (scan) {
    vulnerabilities = await api.scans.getVulnerabilities({
      projectId: project.id,
      scanId: scan.id,
    });
  }

  return (
    <section>
      <Card className="bg-white">
        <CardHeader>
          <Tabs defaultValue="findings" className="w-full">
            <TabsList className="mb-4 grid w-[600px] grid-cols-3">
              <TabsTrigger value="findings" className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4" />
                Latest Findings
              </TabsTrigger>
              <TabsTrigger value="scans" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Scans
              </TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                Project Links
              </TabsTrigger>
            </TabsList>

            <TabsContent value="findings" className="mt-0">
              <ScanFindingsList vulnerabilities={vulnerabilities} />
            </TabsContent>

            <TabsContent value="scans" className="mt-0">
              <ScanList scans={scans ?? []} />
            </TabsContent>

            <TabsContent value="links" className="mt-0">
              {/* Project links content will go here */}
              <LinksList />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </section>
  );
}
