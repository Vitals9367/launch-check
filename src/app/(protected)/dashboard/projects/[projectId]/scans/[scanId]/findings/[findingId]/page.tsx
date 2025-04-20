import {
  AlertTriangle,
  Book,
  LinkIcon,
  ExternalLink,
  Shield,
  Wrench,
  Target,
  FileCheck,
  Bell,
  Scale,
  ScrollText,
  Clock,
  GraduationCap,
  DollarSign,
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
import { Separator } from "@/components/ui/separator";
import matter from "gray-matter";

interface ResourceRequirements {
  time: string;
  expertise: string;
  cost: string;
}

interface QuickWins {
  immediate: string[];
  shortTerm: string[];
}

interface ImpactAnalysis {
  description: string;
  realWorldExamples: string[];
  businessImpact: string;
  commonMistakes: string[];
}

interface MonitoringGuidelines {
  tools: string[];
  metrics: string[];
  alerts: string[];
}

interface TestingApproach {
  manual: string[];
  automated: string[];
  frequency: string;
}

interface PriorityAssessment {
  urgency: string;
  effort: string;
  impact: string;
}

interface EnrichedData {
  frameworkFixes: Record<string, string>;
  impactAnalysis: ImpactAnalysis;
  mitigation: {
    quickWins: QuickWins;
    resourceRequirements: ResourceRequirements;
  };
  priority: PriorityAssessment;
  compliance: {
    standards: string[];
  };
  monitoring: MonitoringGuidelines;
  testing: TestingApproach;
}

interface Finding {
  id: string;
  scanId: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  confidence: "confirmed" | "high" | "medium" | "low";
  solution: string | null;
  reference: string | null;
  tags: string[] | null;
  url: string;
  evidence: string | null;
  cveId: string | null;
  cweIds: string[] | null;
  requestHeaders: Record<string, string> | null;
  responseHeaders: Record<string, string> | null;
  createdAt: Date;
  metadata: unknown;
  enrichedData: EnrichedData | null;
}

function isFinding(value: unknown): value is Finding {
  const finding = value as Finding;
  return (
    typeof finding === "object" &&
    finding !== null &&
    typeof finding.id === "string" &&
    typeof finding.name === "string" &&
    typeof finding.description === "string" &&
    typeof finding.url === "string" &&
    (finding.solution === null || typeof finding.solution === "string") &&
    (finding.reference === null || typeof finding.reference === "string") &&
    (finding.tags === null || Array.isArray(finding.tags)) &&
    (finding.evidence === null || typeof finding.evidence === "string") &&
    (finding.cveId === null || typeof finding.cveId === "string") &&
    (finding.cweIds === null || Array.isArray(finding.cweIds)) &&
    (finding.requestHeaders === null ||
      typeof finding.requestHeaders === "object") &&
    (finding.responseHeaders === null ||
      typeof finding.responseHeaders === "object") &&
    finding.createdAt instanceof Date
  );
}

export default async function FindingPage({
  params,
}: {
  params: Promise<{ projectId: string; scanId: string; findingId: string }>;
}) {
  const { projectId, scanId, findingId } = await params;

  const result = await api.findings.getById({
    findingId: findingId,
  });

  if (!result || !isFinding(result)) {
    notFound();
  }

  const finding = result;

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
    ? JSON.stringify(finding.requestHeaders, null, 2)
    : null;
  const responseHeadersStr = finding.responseHeaders
    ? JSON.stringify(finding.responseHeaders, null, 2)
    : null;

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
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
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex gap-8">
          {/* Main Content Column */}
          <div className="min-w-0 flex-1">
            <div className="space-y-8">
              {/* Header */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                      {finding.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      Detected{" "}
                      {new Date(finding.createdAt).toLocaleDateString()} at{" "}
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
                        {finding.url}
                      </code>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={cn("capitalize", severityColor)}
                    >
                      <AlertTriangle className="mr-1.5 h-4 w-4" />
                      {finding.severity} Severity
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={cn("capitalize", confidenceColor)}
                    >
                      <Shield className="mr-1.5 h-4 w-4" />
                      {finding.confidence} Confidence
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Description and Solution */}
              <section className="rounded-lg bg-white p-8 shadow-sm">
                <h2 className="mb-6 flex items-center text-2xl font-semibold">
                  <Book className="mr-2 h-6 w-6 text-gray-400" />
                  Overview
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-gray-900">
                      Description
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {finding.description}
                    </p>
                  </div>

                  {finding.solution && (
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Solution
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {finding.solution}
                      </p>
                    </div>
                  )}

                  {finding.evidence && (
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Evidence
                      </h3>
                      <div className="rounded-lg border border-gray-200">
                        <CodeBlock
                          code={finding.evidence}
                          language="plaintext"
                          className="whitespace-pre-wrap"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Mitigation */}
              {finding.enrichedData && (
                <section className="rounded-lg bg-white p-8 shadow-sm">
                  <h2 className="mb-6 flex items-center text-2xl font-semibold">
                    <Shield className="mr-2 h-6 w-6 text-gray-400" />
                    Mitigation
                  </h2>
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-gray-900">
                          Quick Wins
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <h4 className="mb-3 font-medium text-gray-700">
                              Immediate Actions
                            </h4>
                            <ul className="list-inside list-disc space-y-2 text-gray-700">
                              {finding.enrichedData.mitigation.quickWins.immediate.map(
                                (action, index) => (
                                  <li key={index} className="leading-relaxed">
                                    {action}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-3 font-medium text-gray-700">
                              Short-Term Actions
                            </h4>
                            <ul className="list-inside list-disc space-y-2 text-gray-700">
                              {finding.enrichedData.mitigation.quickWins.shortTerm.map(
                                (action, index) => (
                                  <li key={index} className="leading-relaxed">
                                    {action}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 text-lg font-medium text-gray-900">
                          Resource Requirements
                        </h3>
                        <div className="space-y-3">
                          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <h4 className="font-medium text-gray-900">
                                  Time Estimate
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {
                                    finding.enrichedData.mitigation
                                      .resourceRequirements.time
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50">
                                <GraduationCap className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <h4 className="font-medium text-gray-900">
                                  Required Expertise
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {
                                    finding.enrichedData.mitigation
                                      .resourceRequirements.expertise
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
                                <DollarSign className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <h4 className="font-medium text-gray-900">
                                  Cost Estimate
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {
                                    finding.enrichedData.mitigation
                                      .resourceRequirements.cost
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Framework Fixes */}
              {finding.enrichedData && (
                <section className="rounded-lg bg-white p-8 shadow-sm">
                  <h2 className="mb-6 flex items-center text-2xl font-semibold">
                    <Wrench className="mr-2 h-6 w-6 text-gray-400" />
                    Framework-Specific Fixes
                  </h2>
                  {Object.entries(finding.enrichedData.frameworkFixes).length >
                  0 ? (
                    <Tabs
                      defaultValue={
                        Object.keys(finding.enrichedData.frameworkFixes)[0]
                      }
                      className="space-y-6"
                    >
                      <TabsList className="w-full justify-start border-b pb-px">
                        {Object.keys(finding.enrichedData.frameworkFixes).map(
                          (framework) => (
                            <TabsTrigger
                              key={framework}
                              value={framework}
                              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
                            >
                              {framework}
                            </TabsTrigger>
                          ),
                        )}
                      </TabsList>
                      {Object.entries(finding.enrichedData.frameworkFixes).map(
                        ([framework, fix]) => {
                          const { content } = matter(fix);
                          return (
                            <TabsContent
                              key={framework}
                              value={framework}
                              className="mt-6"
                            >
                              <div className="rounded-lg border border-gray-200">
                                <CodeBlock
                                  code={content}
                                  language="markdown"
                                  className="overflow-x-auto"
                                />
                              </div>
                            </TabsContent>
                          );
                        },
                      )}
                    </Tabs>
                  ) : (
                    <p className="italic text-gray-500">
                      No framework-specific fixes available.
                    </p>
                  )}
                </section>
              )}

              {/* Impact Analysis */}
              {finding.enrichedData && (
                <section className="rounded-lg bg-white p-8 shadow-sm">
                  <h2 className="mb-6 flex items-center text-2xl font-semibold">
                    <Target className="mr-2 h-6 w-6 text-gray-400" />
                    Impact Analysis
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Description
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {finding.enrichedData.impactAnalysis.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Real-World Examples
                      </h3>
                      <ul className="list-inside list-disc space-y-3 text-gray-700">
                        {finding.enrichedData.impactAnalysis.realWorldExamples.map(
                          (example, index) => (
                            <li key={index} className="leading-relaxed">
                              {example}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Business Impact
                      </h3>
                      <p className="leading-relaxed text-gray-700">
                        {finding.enrichedData.impactAnalysis.businessImpact}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium text-gray-900">
                        Common Mistakes
                      </h3>
                      <ul className="list-inside list-disc space-y-3 text-gray-700">
                        {finding.enrichedData.impactAnalysis.commonMistakes.map(
                          (mistake, index) => (
                            <li key={index} className="leading-relaxed">
                              {mistake}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Metadata Card */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Metadata
                </h3>
                <div className="space-y-4">
                  {finding.reference && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        References
                      </h4>
                      <a
                        href={finding.reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <span>View Documentation</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  {finding.cveId && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        CVE ID
                      </h4>
                      <code className="rounded-md bg-gray-100 px-2 py-1 text-sm">
                        {finding.cveId}
                      </code>
                    </div>
                  )}

                  {finding.cweIds && finding.cweIds.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        CWE IDs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {finding.cweIds.map((cwe) => (
                          <Badge
                            key={cwe}
                            variant="secondary"
                            className="text-sm"
                          >
                            {cwe}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {finding.tags && finding.tags.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {finding.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* HTTP Details Card */}
              {(requestHeadersStr || responseHeadersStr) && (
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    HTTP Details
                  </h3>
                  <div className="space-y-4">
                    {requestHeadersStr && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-700">
                          Request Headers
                        </h4>
                        <div className="rounded-lg border border-gray-200">
                          <CodeBlock
                            code={requestHeadersStr}
                            language="json"
                            className="max-h-48 overflow-y-auto text-sm"
                          />
                        </div>
                      </div>
                    )}
                    {responseHeadersStr && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-gray-700">
                          Response Headers
                        </h4>
                        <div className="rounded-lg border border-gray-200">
                          <CodeBlock
                            code={responseHeadersStr}
                            language="json"
                            className="max-h-48 overflow-y-auto text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Priority Assessment Card */}
              {finding.enrichedData && (
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">
                    Priority Assessment
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Urgency</h4>
                        <Badge
                          variant="secondary"
                          className="bg-orange-50 text-orange-700"
                        >
                          {finding.enrichedData.priority.urgency}
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">
                          Required Effort
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700"
                        >
                          {finding.enrichedData.priority.effort}
                        </Badge>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">
                          Business Impact
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-red-50 text-red-700"
                        >
                          {finding.enrichedData.priority.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
