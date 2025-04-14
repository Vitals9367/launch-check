"use client";

import { Grid, Globe, Scan, History } from "lucide-react";
import { useState } from "react";
import Separator from "./sidebar-separator";
import { NavigationSection } from "./types";
import { SidebarSection } from "./sidebar-section";
import { SidebarSectionTitle } from "./sidebar-section-title";

const navigationSections: NavigationSection[] = [
  {
    items: [
      {
        href: "/dashboard",
        icon: Grid,
        label: "Dashboard",
      },
      {
        href: "/dashboard/projects",
        icon: Globe,
        label: "Projects",
      },
    ],
  },
  {
    title: "Scan",
    items: [
      {
        href: "/dashboard/scan",
        icon: Scan,
        label: "Scan Now",
      },
      {
        href: "/dashboard/scans",
        icon: History,
        label: "Scan History",
      },
    ],
  },
];

export function Navigation() {
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >(() =>
    Object.fromEntries(navigationSections.map((_, index) => [index, true])),
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <nav className="sticky top-0 flex-1 space-y-1 px-2 py-3">
      {navigationSections.map((section, index) => (
        <div key={index} className="rounded-lg">
          <div className="space-y-0.5">
            {section.title && (
              <SidebarSectionTitle
                onClick={() => toggleSection(index)}
                isExpanded={expandedSections[index] ?? true}
                title={section.title}
              />
            )}
            <SidebarSection
              section={section}
              isExpanded={expandedSections[index] ?? true}
            />
          </div>
          {index < navigationSections.length - 1 && <Separator />}
        </div>
      ))}
    </nav>
  );
}
