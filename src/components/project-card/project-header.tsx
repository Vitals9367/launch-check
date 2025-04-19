import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import type { StatusDetails } from "./types";

interface ProjectHeaderProps {
  name: string;
  isSelected?: boolean;
  statusDetails: StatusDetails;
}

export function ProjectHeader({
  name,
  isSelected,
  statusDetails,
}: ProjectHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "rounded-lg p-2 transition-colors",
            isSelected
              ? "bg-blue-100"
              : "bg-blue-50 group-hover:bg-blue-100/50",
          )}
        >
          <Folder
            className={cn(
              "h-5 w-5 transition-colors",
              isSelected ? "text-blue-600" : "text-blue-500",
            )}
          />
        </div>
        <h3
          className={cn(
            "font-medium transition-colors",
            isSelected
              ? "text-blue-700"
              : "text-gray-900 group-hover:text-blue-600",
          )}
        >
          {name}
        </h3>
      </div>
      <StatusBadge details={statusDetails} />
    </div>
  );
}
