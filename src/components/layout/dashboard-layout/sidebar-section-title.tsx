"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SidebarSectionTitleProps {
  onClick: () => void;
  isExpanded: boolean;
  title: string;
}

export function SidebarSectionTitle({
  onClick,
  isExpanded,
  title,
}: SidebarSectionTitleProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      <span>{title}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-150",
          isExpanded ? "rotate-0" : "-rotate-90",
        )}
      />
    </button>
  );
}
