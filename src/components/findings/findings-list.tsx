import ScanFinding from "./finding";

type Severity = "critical" | "high" | "medium" | "low";

interface Vulnerability {
  id: string;
  name: string;
  severity: Severity;
  location: string;
  detectedAt: string;
  scanId: string;
  projectId: string;
  remediation?: string;
  effort?: "low" | "medium" | "high";
  completionPercentage?: number;
  documentationUrl?: string;
}

const mockVulnerabilities: Vulnerability[] = [
  {
    id: "1",
    name: "SQL Injection Vulnerability",
    severity: "critical",
    location: "api/users/create.ts:42",
    detectedAt: "2 hours ago",
    scanId: "scan-1",
    projectId: "1",
    remediation: "Use parameterized queries or an ORM to prevent SQL injection",
    effort: "medium",
    completionPercentage: 0,
    documentationUrl: "https://owasp.org/www-community/attacks/SQL_Injection",
  },
  {
    id: "2",
    name: "Cross-Site Scripting (XSS)",
    severity: "high",
    location: "components/Comments.tsx:156",
    detectedAt: "3 hours ago",
    scanId: "scan-1",
    projectId: "1",
    remediation: "Implement proper input validation and output encoding",
    effort: "medium",
    completionPercentage: 25,
    documentationUrl: "https://owasp.org/www-community/attacks/xss/",
  },
  {
    id: "3",
    name: "Insecure Direct Object Reference",
    severity: "medium",
    location: "routes/profile.ts:89",
    detectedAt: "5 hours ago",
    scanId: "scan-1",
    projectId: "1",
    remediation:
      "Implement proper access controls and user authorization checks",
    effort: "high",
    completionPercentage: 50,
    documentationUrl:
      "https://owasp.org/www-community/vulnerabilities/Insecure_Direct_Object_Reference",
  },
  {
    id: "4",
    name: "Missing Rate Limiting",
    severity: "low",
    location: "middleware/auth.ts:23",
    detectedAt: "6 hours ago",
    scanId: "scan-1",
    projectId: "1",
    remediation: "Implement rate limiting middleware with proper thresholds",
    effort: "low",
    completionPercentage: 75,
    documentationUrl:
      "https://cheatsheetseries.owasp.org/cheatsheets/API_Security_Cheat_Sheet.html#rate-limiting",
  },
];

interface FindingsListProps {
  projectId: string;
  scanId?: string;
  limit?: number;
}

export function FindingsList({
  projectId,
  scanId,
  limit = 4,
}: FindingsListProps) {
  if (mockVulnerabilities.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No findings match your criteria
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {mockVulnerabilities.slice(0, limit).map((vulnerability) => (
        <ScanFinding key={vulnerability.id} {...vulnerability} />
      ))}
    </div>
  );
}
