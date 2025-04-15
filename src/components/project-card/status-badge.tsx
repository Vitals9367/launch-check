import { cn } from "@/lib/utils";
import type { StatusDetails } from "./types";

interface StatusBadgeProps {
  details: StatusDetails;
}

export function StatusBadge({ details }: StatusBadgeProps) {
  return (
    <div className={cn("rounded-full px-3 py-1", details.color)}>
      <div className="flex items-center gap-1.5">
        {details.icon}
        <span className="text-sm font-medium">{details.text}</span>
      </div>
    </div>
  );
}
