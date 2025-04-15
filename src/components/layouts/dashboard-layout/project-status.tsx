import { AlertTriangle, CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const mockScanStatuses = ["secure", "warning", "vulnerable"] as const;
export type ScanStatus = (typeof mockScanStatuses)[number];

export function getMockScanData(projectId: string): {
  status: ScanStatus;
  vulnerabilities: number;
} {
  const lastChar = projectId.slice(-1);
  const statusIndex =
    Math.abs(parseInt(lastChar, 16)) % mockScanStatuses.length;
  const status = mockScanStatuses[statusIndex] as ScanStatus;
  const vulnerabilities =
    status === "secure" ? 0 : status === "warning" ? 1 : 3;
  return { status, vulnerabilities };
}

interface ProjectStatusIndicatorProps {
  status: ScanStatus;
  vulnerabilities: number;
}

export function ProjectStatusIndicator({
  status,
  vulnerabilities,
}: ProjectStatusIndicatorProps) {
  const getStatusDetails = (status: ScanStatus) => {
    switch (status) {
      case "secure":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          text: "Secure - No issues found",
          color: "text-green-600",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
          text: `Warning - ${vulnerabilities} issue${vulnerabilities === 1 ? "" : "s"} found`,
          color: "text-yellow-600",
        };
      case "vulnerable":
        return {
          icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
          text: `Critical - ${vulnerabilities} security issue${vulnerabilities === 1 ? "" : "s"} found`,
          color: "text-red-600",
        };
    }
  };

  const details = getStatusDetails(status);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5">
            {details.icon}
            {vulnerabilities > 0 && (
              <span className={cn("text-xs font-medium", details.color)}>
                {vulnerabilities}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{details.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
