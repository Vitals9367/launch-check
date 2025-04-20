import {
  AlertTriangle,
  Book,
  LinkIcon,
  ExternalLink,
  Shield,
} from "lucide-react";
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
  params: Promise<{ projectId: string; scanId: string; findingId: string }>;
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
    info: "bg-gray-50 text-gray-700 border-gray-200",
  } as const;

  const confidenceColors = {
    confirmed: "bg-green-50 text-green-700 border-green-200",
    high: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    low: "bg-gray-50 text-gray-700 border-gray-200",
  } as const;

  const severityColor = severityColors[finding.severity];
  const confidenceColor = confidenceColors[finding.confidence];

  // Format headers for display and ensure they are strings
  const requestHeadersStr = finding.requestHeaders
    ? JSON.stringify(finding.requestHeaders as Record<string, string>, null, 2)
    : null;
  const responseHeadersStr = finding.responseHeaders
    ? JSON.stringify(finding.responseHeaders as Record<string, string>, null, 2)
    : null;

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
            Detected {new Date(finding.createdAt).toLocaleDateString()} at{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
              {finding.url}
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
          <Badge
            variant="secondary"
            className={cn("capitalize", confidenceColor)}
          >
            <Shield className="mr-1 h-3 w-3" />
            {finding.confidence} Confidence
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

          {finding.solution && (
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{finding.solution}</p>
              </CardContent>
            </Card>
          )}

          {finding.evidence && (
            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-sm">
                  {finding.evidence}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {finding.reference && (
                <div>
                  <h4 className="mb-1 font-medium">References</h4>
                  <a
                    href={finding.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <span>Learn more</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              {finding.cveId && (
                <div>
                  <h4 className="mb-1 font-medium">CVE ID</h4>
                  <p className="font-mono text-sm">{finding.cveId}</p>
                </div>
              )}
              {finding.cweIds && finding.cweIds.length > 0 && (
                <div>
                  <h4 className="mb-1 font-medium">CWE IDs</h4>
                  <div className="flex flex-wrap gap-1">
                    {finding.cweIds.map((cwe) => (
                      <Badge key={cwe} variant="secondary">
                        {cwe}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {finding.tags && finding.tags.length > 0 && (
                <div>
                  <h4 className="mb-1 font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {finding.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {(requestHeadersStr || responseHeadersStr) && (
            <Card>
              <CardHeader>
                <CardTitle>HTTP Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {requestHeadersStr && (
                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      Request Headers
                    </h3>
                    <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4">
                      <code>{requestHeadersStr}</code>
                    </pre>
                  </div>
                )}
                {responseHeadersStr && (
                  <div className="mt-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      Response Headers
                    </h3>
                    <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4">
                      <code>{responseHeadersStr}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
