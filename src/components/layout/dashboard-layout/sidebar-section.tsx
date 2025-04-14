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
      <div className={cn("space-y-0.5", section.title && "ml-3")}>
        {section.items.map((item) => (
          <SidebarItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}
