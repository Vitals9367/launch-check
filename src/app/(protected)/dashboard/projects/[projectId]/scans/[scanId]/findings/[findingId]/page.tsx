import { AlertTriangle, Book, LinkIcon, ExternalLink } from "lucide-react";
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
import { CodeBlock } from "@/components/code-block";
import { notFound } from "next/navigation";

export default async function FindingPage({
  params,
}: {
  params: { projectId: string; scanId: string; findingId: string };
}) {
  const { projectId, scanId, findingId } = await params;

  const finding = await api.findings.getById({
    findingId: findingId,
  });

  if (!finding) {
    notFound();
  }

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

  const severityColor =
    severityColors[finding.severity as keyof typeof severityColors];

  // TODO: Finish the page
  // const effortColor = effortColors[finding.e as keyof typeof effortColors];

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
          <h1 className="text-2xl font-bold tracking-tight">{finding.title}</h1>
          <p className="text-sm text-gray-500">
            Detected {new Date(finding.createdAt).toLocaleDateString()} in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
              {finding.location}
            </code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn("capitalize", severityColor)}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {finding.severity} Severity
          </Badge>
          {/* <Badge variant="secondary" className={cn("capitalize", effortColor)}>
            {finding.effort} effort to fix
          </Badge> */}
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
            {/* <CardContent>
              <p className="text-gray-700">{finding.impact}</p>
            </CardContent> */}
          </Card>

          {/* <Card>
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
                      <CodeBlock
                        code={tech.vulnerableCode}
                        language={tech.language}
                        className="bg-red-950/5"
                      />
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium">Fixed Code</h4>
                      <CodeBlock
                        code={tech.fixedCode}
                        language={tech.language}
                        className="bg-green-950/5"
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card> */}
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
            {/* <CardContent className="space-y-4">
              {finding.references.map((reference) => (
                <a
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <span>{reference.title}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </CardContent> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
