import { type Project } from "@/server/db/schema/projects";
import type { ProjectWithStats } from "@/types/project";

export const mockScanStatuses = ["secure", "warning", "vulnerable"] as const;
export type ScanStatus = (typeof mockScanStatuses)[number];

export interface StatusDetails {
  icon: React.ReactNode;
  text: string;
  color: string;
  variant: "default" | "secondary" | "destructive";
}

export interface ScanData {
  status: ScanStatus;
  vulnerabilities: number;
  lastScan: string;
}
