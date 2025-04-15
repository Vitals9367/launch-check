import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardFooter } from "@/components/ui/card";

interface ProjectFooterProps {
  lastScan: string;
  isSelected?: boolean;
}

export function ProjectFooter({ lastScan, isSelected }: ProjectFooterProps) {
  return (
    <CardFooter
      className={cn(
        "border-t px-6 py-3 transition-colors",
        isSelected ? "bg-blue-100/50" : "bg-gray-50 group-hover:bg-blue-50/30",
      )}
    >
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>Last scan: {lastScan}</span>
      </div>
    </CardFooter>
  );
}
