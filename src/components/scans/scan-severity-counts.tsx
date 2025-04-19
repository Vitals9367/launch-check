import { Badge } from "@/components/ui/badge";

interface SeverityCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface ScanSeverityCountsProps {
  counts: SeverityCount;
}

export function ScanSeverityCounts({ counts }: ScanSeverityCountsProps) {
  return (
    <div className="flex items-center space-x-2">
      <SeverityBadge
        label="Critical"
        count={counts.critical}
        className="bg-red-50 text-red-700"
      />
      <SeverityBadge
        label="High"
        count={counts.high}
        className="bg-orange-50 text-orange-700"
      />
      <SeverityBadge
        label="Medium"
        count={counts.medium}
        className="bg-yellow-50 text-yellow-700"
      />
      <SeverityBadge
        label="Low"
        count={counts.low}
        className="bg-blue-50 text-blue-700"
      />
    </div>
  );
}

interface SeverityBadgeProps {
  label: string;
  count: number;
  className?: string;
}

function SeverityBadge({ label, count, className }: SeverityBadgeProps) {
  return (
    <Badge variant="secondary" className={className}>
      {count} {label}
    </Badge>
  );
}
