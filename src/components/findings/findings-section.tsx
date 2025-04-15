import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, AlertOctagon } from "lucide-react";
import { FindingsList } from "./findings-list";
import { RecentScans } from "../project/recent-scans";
import { Project } from "@/server/db/schema/projects";

interface FindingsSectionProps {
  projectId: string;
  project: Project;
}

export function FindingsSection({ projectId, project }: FindingsSectionProps) {
  return (
    <section>
      <Card className="border-2 bg-white">
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
              <FindingsList projectId={projectId} />
            </TabsContent>

            <TabsContent value="scans" className="mt-0">
              <RecentScans project={project} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </section>
  );
}
