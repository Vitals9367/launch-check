import type { Scan } from "@/server/db/schema/scan";

export interface ScanTotals {
  totalScans: number;
  totalVulnerabilities: number;
  totalCritical: number;
  totalHigh: number;
  totalMedium: number;
  totalLow: number;
}

export interface SecurityStats {
  securityScore: number;
  rating: "A" | "B" | "C" | "D" | "F";
  vulnerabilityBreakdown: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export function calculateScanTotals(scans: Scan[]): ScanTotals {
  return {
    totalScans: scans.length,
    totalVulnerabilities: scans.reduce(
      (sum, scan) => sum + scan.totalFindings,
      0,
    ),
    totalCritical: scans.reduce((sum, scan) => sum + scan.criticalCount, 0),
    totalHigh: scans.reduce((sum, scan) => sum + scan.highCount, 0),
    totalMedium: scans.reduce((sum, scan) => sum + scan.mediumCount, 0),
    totalLow: scans.reduce((sum, scan) => sum + scan.lowCount, 0),
  };
}

export function calculateSecurityStats(scan: Scan | null): SecurityStats {
  // Default values for no scan
  if (!scan) {
    return {
      securityScore: 100,
      rating: "A",
      vulnerabilityBreakdown: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
      },
    };
  }

  // Calculate security score based on findings
  let securityScore = 100;

  // Deduct points based on severity
  securityScore -= scan.criticalCount * 20; // -20 points per critical
  securityScore -= scan.highCount * 10; // -10 points per high
  securityScore -= scan.mediumCount * 5; // -5 points per medium
  securityScore -= scan.lowCount * 2; // -2 points per low

  // Ensure score doesn't go below 0
  securityScore = Math.max(0, securityScore);

  // Determine rating based on score
  let rating: "A" | "B" | "C" | "D" | "F";
  if (securityScore >= 90) rating = "A";
  else if (securityScore >= 80) rating = "B";
  else if (securityScore >= 70) rating = "C";
  else if (securityScore >= 60) rating = "D";
  else rating = "F";

  return {
    securityScore,
    rating,
    vulnerabilityBreakdown: {
      critical: scan.criticalCount,
      high: scan.highCount,
      medium: scan.mediumCount,
      low: scan.lowCount,
    },
  };
}

export function getScanStatus(
  scan: Scan | null,
): "secure" | "warning" | "vulnerable" {
  if (!scan) return "secure";

  if (scan.criticalCount > 0 || scan.highCount > 0) {
    return "vulnerable";
  } else if (scan.mediumCount > 0) {
    return "warning";
  }
  return "secure";
}
