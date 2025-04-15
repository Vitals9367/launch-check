import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, AlertOctagon } from "lucide-react";
import { ScanFindingsList } from "@/components/scan-findings/scan-findings-list";
import { ScanList } from "@/components/scans/scan-list";
import { Project } from "@/server/db/schema/projects";

interface FindingsSectionProps {
  project: Project;
}

export function FindingsSection({ project }: FindingsSectionProps) {
  return (
    <section>
      <Card className="bg-white">
        <CardHeader>
          <Tabs defaultValue="findings" className="w-full">
            <TabsList className="mb-4 grid w-[400px] grid-cols-2">
              <TabsTrigger value="findings" className="flex items-center gap-2">
                <AlertOctagon className="h-4 w-4" />
                Latest Findings
              </TabsTrigger>
              <TabsTrigger value="scans" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Scans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="findings" className="mt-0">
              <ScanFindingsList vulnerabilities={[]} />
            </TabsContent>

            <TabsContent value="scans" className="mt-0">
              <ScanList scans={[]} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </section>
  );
}
