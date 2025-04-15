import { useMemo } from "react";
import type { ScanData, ScanStatus, StatusDetails } from "./types";
import { mockScanStatuses } from "./types";
import { getStatusConfig } from "./status-config";

export function useScanData(projectId: string) {
  const scanData = useMemo((): ScanData => {
    // Use the last character of the ID to determine status (for demo purposes)
    const lastChar = projectId.slice(-1);
    const statusIndex =
      Math.abs(parseInt(lastChar, 16)) % mockScanStatuses.length;
    const status = mockScanStatuses[statusIndex] as ScanStatus;

    // Generate a consistent number of vulnerabilities based on status
    const vulnerabilities =
      status === "secure" ? 0 : status === "warning" ? 1 : 3;

    return {
      status,
      vulnerabilities,
      lastScan: "2 hours ago", // Mock last scan time
    };
  }, [projectId]);

  const statusDetails = useMemo((): StatusDetails => {
    return getStatusConfig(scanData.status);
  }, [scanData.status]);

  return {
    scanData,
    statusDetails,
  };
}
