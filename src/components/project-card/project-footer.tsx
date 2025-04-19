import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardFooter } from "@/components/ui/card";

interface ProjectFooterProps {
  lastScan: string | null;
  isSelected?: boolean;
}

export function ProjectFooter({ lastScan, isSelected }: ProjectFooterProps) {
  return (
    <CardFooter
      className={cn(
        "flex items-center gap-2 border-t p-4 text-sm text-gray-500",
        isSelected ? "border-blue-100" : "border-gray-100",
      )}
    >
      <Clock className="h-4 w-4" />
      {lastScan ? (
        <time dateTime={lastScan}>
          Last scan: {new Date(lastScan).toLocaleDateString()}
        </time>
      ) : (
        <span>No scans yet</span>
      )}
    </CardFooter>
  );
}
