"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarSectionTitleProps {
  title: string;
  isExpanded: boolean;
  onClick: () => void;
}

export function SidebarSectionTitle({
  title,
  isExpanded,
  onClick,
}: SidebarSectionTitleProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {title}
      <ChevronDown
        className={cn(
          "h-4 w-4 text-gray-500 transition-transform",
          isExpanded ? "rotate-0" : "-rotate-90",
        )}
      />
    </button>
  );
}
