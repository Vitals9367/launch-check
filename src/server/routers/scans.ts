import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const ScanSummarySchema = z.object({
  total: z.number(),
  critical: z.number(),
  high: z.number(),
  medium: z.number(),
  low: z.number(),
});

const VulnerabilitySchema = z.object({
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

const ScanSchema = z.object({
  id: z.string(),
  status: z.enum(["in_progress", "completed", "failed"]),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  summary: ScanSummarySchema,
  vulnerabilities: z.array(VulnerabilitySchema),
  projectId: z.string(),
});

const ScanResultSchema = z.object({
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
const mockVulnerabilities: Vulnerability[] = [
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
const mockScan: Scan = {
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
const mockScanList: ScanResult[] = [
  {
    id: "scan-1",
    date: "3/15/2024",
    status: "In Progress",
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    duration: "Running...",
  },
  {
    id: "scan-2",
    date: "3/10/2024",
    status: "Failed",
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    duration: "7m",
    error: "Target application firewall blocked automated scanning attempts.",
  },
  {
    id: "scan-3",
    date: "3/5/2024",
    status: "Completed",
    critical: 1,
    high: 3,
    medium: 6,
    low: 9,
    duration: "38m",
  },
];

export const scansRouter = createTRPCRouter({
  getLastScan: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ input }) => {
      // Generate a deterministic last scan date based on project ID
      const projectIdSum = input.projectId
        .split("-")
        .map((part) => parseInt(part, 16))
        .reduce((a, b) => a + b, 0);

      // Use the project ID to generate a date within the last 30 days
      const daysAgo = projectIdSum % 30;
      const lastScanDate = new Date();
      lastScanDate.setDate(lastScanDate.getDate() - daysAgo);

      return {
        lastScanDate: lastScanDate.toISOString(),
      };
    }),

  getById: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // TODO: Replace with actual database query
      return mockScan;
    }),

  getVulnerabilities: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // TODO: Replace with actual database query
      // In a real implementation, we would filter vulnerabilities by scan ID
      return mockVulnerabilities;
    }),

  getScans: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // TODO: Replace with actual database query
      return mockScanList;
    }),
});
