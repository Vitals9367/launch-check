import {
  AlertTriangle,
  AlertOctagon,
  CircleOff,
  AlertCircle,
} from "lucide-react";
import { SEVERITY_ICONS } from "./constants";
import { VulnerabilityStats } from "@/server/utils/vulnerability-stats";

const SEVERITY_ICON_COMPONENTS = {
  critical: AlertOctagon,
  high: AlertTriangle,
  medium: AlertCircle,
  low: CircleOff,
} as const;

interface SeverityItemProps {
  type: keyof typeof SEVERITY_ICONS;
  count: number;
}

function SeverityItem({ type, count }: SeverityItemProps) {
  const Icon = SEVERITY_ICON_COMPONENTS[type];
  const { color, label } = SEVERITY_ICONS[type];

  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className={`font-medium ${color}`}>
        {count} {label}
      </span>
    </div>
  );
}

interface SeverityListProps {
  vulnerabilities: Pick<
    VulnerabilityStats,
    "critical" | "high" | "medium" | "low"
  >;
}

export function SeverityList({ vulnerabilities }: SeverityListProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
      <SeverityItem type="critical" count={vulnerabilities.critical} />
      <SeverityItem type="high" count={vulnerabilities.high} />
      <SeverityItem type="medium" count={vulnerabilities.medium} />
      <SeverityItem type="low" count={vulnerabilities.low} />
    </div>
  );
}
