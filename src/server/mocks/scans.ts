import { z } from "zod";

export const ScanSummarySchema = z.object({
  total: z.number(),
  critical: z.number(),
  high: z.number(),
  medium: z.number(),
  low: z.number(),
});

export const VulnerabilitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  detectedAt: z.string(),
  status: z.enum(["open", "fixed", "false_positive"]),
  location: z.string(),
  scanId: z.string(),
  projectId: z.string(),
});

export const ScanSchema = z.object({
  id: z.string(),
  status: z.enum(["in_progress", "completed", "failed"]),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  summary: ScanSummarySchema,
  vulnerabilities: z.array(VulnerabilitySchema),
  projectId: z.string(),
});

export const ScanResultSchema = z.object({
  id: z.string(),
  date: z.string(),
  status: z.enum(["In Progress", "Failed", "Completed"]),
  critical: z.number(),
  high: z.number(),
  medium: z.number(),
  low: z.number(),
  duration: z.string(),
  error: z.string().optional(),
});

export type Scan = z.infer<typeof ScanSchema>;
export type Vulnerability = z.infer<typeof VulnerabilitySchema>;
export type ScanResult = z.infer<typeof ScanResultSchema>;

// Mock vulnerability data
export const mockVulnerabilities: Vulnerability[] = [
  {
    id: "vuln-1",
    title: "SQL Injection in Login Form",
    description:
      "A SQL injection vulnerability was detected in the login form that could allow unauthorized access to the database.",
    severity: "critical",
    detectedAt: "2024-03-20T10:02:00Z",
    status: "open",
    location: "src/app/login/page.tsx",
    scanId: "scan-1",
    projectId: "project-1",
  },
  {
    id: "vuln-2",
    title: "Cross-Site Scripting (XSS)",
    description:
      "Reflected XSS vulnerability found in the search functionality that could allow injection of malicious scripts.",
    severity: "high",
    detectedAt: "2024-03-20T10:03:00Z",
    status: "open",
    location: "src/app/search/page.tsx",
    scanId: "scan-1",
    projectId: "project-1",
  },
  {
    id: "vuln-3",
    title: "Insecure Direct Object Reference",
    description:
      "IDOR vulnerability detected in the user profile endpoint allowing unauthorized access to user data.",
    severity: "high",
    detectedAt: "2024-03-20T10:03:30Z",
    status: "open",
    location: "src/app/profile/page.tsx",
    scanId: "scan-1",
    projectId: "project-1",
  },
  {
    id: "vuln-4",
    title: "Weak Password Policy",
    description:
      "The application's password policy does not enforce sufficient complexity requirements.",
    severity: "medium",
    detectedAt: "2024-03-20T10:04:00Z",
    status: "open",
    location: "src/app/settings/page.tsx",
    scanId: "scan-1",
    projectId: "project-1",
  },
];

// Mock data for scans
export const mockScan: Scan = {
  id: "1",
  status: "completed",
  startedAt: "2024-03-20T10:00:00Z",
  completedAt: "2024-03-20T10:05:00Z",
  summary: {
    total: 42,
    critical: 2,
    high: 5,
    medium: 15,
    low: 20,
  },
  vulnerabilities: mockVulnerabilities,
  projectId: "project-1",
};

// Mock data for scan list
export const mockScanList: Scan[] = [
  {
    id: "scan-1",
    status: "in_progress",
    startedAt: "2024-03-15T10:00:00Z",
    projectId: "project-1",
    summary: {
      total: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    vulnerabilities: [],
  },
  {
    id: "scan-2",
    status: "failed",
    startedAt: "2024-03-10T10:00:00Z",
    completedAt: "2024-03-10T10:07:00Z",
    projectId: "project-1",
    summary: {
      total: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    vulnerabilities: [],
  },
  {
    id: "scan-3",
    status: "completed",
    startedAt: "2024-03-05T10:00:00Z",
    completedAt: "2024-03-05T10:38:00Z",
    projectId: "project-1",
    summary: {
      total: 19,
      critical: 1,
      high: 3,
      medium: 6,
      low: 9,
    },
    vulnerabilities: mockVulnerabilities,
  },
];
