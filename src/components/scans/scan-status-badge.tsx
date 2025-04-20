import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const STATUS_STYLES = {
  in_progress: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
} as const;

interface ScanStatusBadgeProps {
  status: keyof typeof STATUS_STYLES;
  errorMessage?: string | null;
}

export function ScanStatusBadge({
  status,
  errorMessage,
}: ScanStatusBadgeProps) {
  const statusStyle = STATUS_STYLES[status];
  if (!statusStyle) return null;

  const StatusBadge = () => (
    <Badge variant="secondary" className={statusStyle.className}>
      {statusStyle.label}
    </Badge>
  );

  if (status === "failed" && errorMessage) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <StatusBadge />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs break-words text-sm">{errorMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <StatusBadge />;
}
