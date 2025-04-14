"use client";

import { cn } from "@/lib/utils";
import { NavigationSection } from "./types";
import { SidebarItem } from "./sidebar-item";

interface SidebarSectionProps {
  section: NavigationSection;
  isExpanded: boolean;
}

export function SidebarSection({ section, isExpanded }: SidebarSectionProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-150 ease-out",
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div
        className={cn(
          "relative space-y-0.5 py-0.5",
          section.title
            ? "ml-2 pl-4 before:absolute before:left-1.5 before:top-0 before:h-full before:w-px before:bg-gray-200"
            : "py-0.5",
        )}
      >
        {section.items.map((item) => (
          <SidebarItem item={item} />
        ))}
      </div>
    </div>
  );
}
