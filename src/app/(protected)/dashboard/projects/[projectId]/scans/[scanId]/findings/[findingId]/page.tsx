"use client";

import {
  AlertTriangle,
  Book,
  Code,
  FileCode,
  Link as LinkIcon,
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
import { Button } from "@/components/ui/button";
import { FindingsFilters } from "@/components/findings/findings-filters";
import { useState } from "react";

type Severity = "critical" | "high" | "medium" | "low";

interface Technology {
  name: string;
  language: string;
  vulnerableCode: string;
  fixedCode: string;
}

interface Finding {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  impact: string;
  remediation: string;
  effort: "low" | "medium" | "high";
  location: string;
  detectedAt: string;
  cwe?: {
    id: string;
    name: string;
    url: string;
  };
  technologies: Technology[];
  references: Array<{
    title: string;
    url: string;
  }>;
}

// This would typically come from your API
const mockFinding: Finding = {
  id: "sql-injection-001",
  name: "SQL Injection Vulnerability",
  severity: "critical",
  description:
    "The application constructs SQL queries using string concatenation with user-supplied input, making it vulnerable to SQL injection attacks.",
  impact:
    "An attacker could manipulate the SQL query to access, modify, or delete unauthorized data from the database. This could lead to data breaches, unauthorized access, or complete system compromise.",
  remediation:
    "Use parameterized queries or an ORM to ensure proper escaping of user input. Never concatenate user input directly into SQL queries.",
  effort: "medium",
  location: "src/api/users/create.ts:42",
  detectedAt: "2024-03-15T10:30:00Z",
  cwe: {
    id: "CWE-89",
    name: "SQL Injection",
    url: "https://cwe.mitre.org/data/definitions/89.html",
  },
  technologies: [
    {
      name: "Node.js with MySQL",
      language: "typescript",
      vulnerableCode: `// ❌ Vulnerable code
const getUserData = async (userId: string) => {
  const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;
  return await db.query(query);
};`,
      fixedCode: `// ✅ Fixed code using prepared statements
const getUserData = async (userId: string) => {
  const query = "SELECT * FROM users WHERE id = ?";
  return await db.query(query, [userId]);
};

// ✅ Alternative using an ORM (Prisma)
const getUserData = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
};`,
    },
    {
      name: "Python with SQLAlchemy",
      language: "python",
      vulnerableCode: `# ❌ Vulnerable code
def get_user_data(user_id):
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    return db.execute(query)`,
      fixedCode: `# ✅ Fixed code using SQLAlchemy ORM
def get_user_data(user_id):
    return db.session.query(User).filter(User.id == user_id).first()

# ✅ Alternative using parameterized query
def get_user_data(user_id):
    query = text("SELECT * FROM users WHERE id = :user_id")
    return db.session.execute(query, {"user_id": user_id})`,
    },
  ],
  references: [
    {
      title: "OWASP SQL Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
    },
    {
      title: "CWE-89: SQL Injection",
      url: "https://cwe.mitre.org/data/definitions/89.html",
    },
  ],
};

export default function FindingPage() {
  const finding = mockFinding; // Replace with actual API call
  const [selectedSeverities, setSelectedSeverities] = useState<Set<Severity>>(
    new Set(["critical", "high", "medium", "low"]),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSeverityChange = (severity: Severity) => {
    const newSeverities = new Set(selectedSeverities);
    if (newSeverities.has(severity)) {
      newSeverities.delete(severity);
    } else {
      newSeverities.add(severity);
    }
    setSelectedSeverities(newSeverities);
  };

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

  return (
    <div className="container mx-auto space-y-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {finding.name}
            </h1>
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

        <FindingsFilters
          selectedSeverities={selectedSeverities}
          onSeverityChange={handleSeverityChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
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
        <div className="space-y-6">
          {finding.cwe && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  CWE Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                Additional Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View File Location
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Mark as Fixed
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Create Jira Issue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
