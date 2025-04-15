import { AlertTriangle, Book, LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/server";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function FindingPage({
  params,
}: {
  params: { projectId: string; scanId: string; findingId: string };
}) {
  const { projectId, scanId, findingId } = await params;

  const finding = await api.findings.getById({
    projectId: projectId as string,
    scanId: scanId as string,
    findingId: findingId as string,
  });

  const severityColors = {
    critical: "bg-red-50 text-red-700 border-red-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const effortColors = {
    low: "bg-green-50 text-green-700",
    medium: "bg-yellow-50 text-yellow-700",
    high: "bg-red-50 text-red-700",
  };

  if (!finding) {
    return (
      <div className="container mx-auto py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="text-lg font-semibold text-red-700">
            Finding Not Found
          </h2>
          <p className="mt-1 text-red-600">
            The requested finding could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/dashboard/projects" },
          { label: "Project", href: `/dashboard/projects/${projectId}` },
          {
            label: "Scan",
            href: `/dashboard/projects/${projectId}/scans/${scanId}`,
          },
          { label: "Finding Details" },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{finding.name}</h1>
          <p className="text-sm text-gray-500">
            Detected {new Date(finding.detectedAt).toLocaleDateString()} in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
              {finding.location}
            </code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn("capitalize", severityColors[finding.severity])}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {finding.severity} Severity
          </Badge>
          <Badge
            variant="secondary"
            className={cn("capitalize", effortColors[finding.effort])}
          >
            {finding.effort} effort to fix
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{finding.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{finding.impact}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Fix</CardTitle>
              <CardDescription>{finding.remediation}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={finding.technologies?.[0]?.name ?? ""}
                className="w-full"
              >
                <TabsList className="w-full justify-start">
                  {finding.technologies.map((tech) => (
                    <TabsTrigger key={tech.name} value={tech.name}>
                      {tech.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {finding.technologies.map((tech) => (
                  <TabsContent
                    key={tech.name}
                    value={tech.name}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="mb-2 font-medium">Vulnerable Code</h4>
                      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
                        <code>{tech.vulnerableCode}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Fixed Code</h4>
                      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
                        <code>{tech.fixedCode}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {finding.cwe && (
                <div className="space-y-2">
                  <h4 className="font-medium">CWE Reference</h4>
                  <a
                    href={finding.cwe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <span>
                      {finding.cwe.id}: {finding.cwe.name}
                    </span>
                    <LinkIcon className="h-3 w-3" />
                  </a>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Related Documentation</h4>
                <ul className="space-y-2">
                  {finding.references.map((ref) => (
                    <li key={ref.url}>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <span>{ref.title}</span>
                        <LinkIcon className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
