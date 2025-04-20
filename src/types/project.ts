import type { Project } from "@/server/db/schema/projects";
import type { SecurityStats } from "@/utils/scan-calculations";

export interface ProjectScanData {
  status: "secure" | "warning" | "vulnerable";
  vulnerabilities: number;
  lastScan: string | null;
  securityScore: number;
  rating: "A" | "B" | "C" | "D" | "F";
  vulnerabilityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ProjectWithStats extends Project {
  scanData: ProjectScanData;
}
