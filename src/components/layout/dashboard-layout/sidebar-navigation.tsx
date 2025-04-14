"use client";

import { LayoutGrid, ScanLine, History, User } from "lucide-react";
import { useState } from "react";
import Separator from "./sidebar-separator";
import { NavigationSection } from "./types";
import { SidebarSection } from "./sidebar-section";
import { SidebarSectionTitle } from "./sidebar-section-title";
import { useProjectsSection } from "./projects-section";

const staticSections: NavigationSection[] = [
  {
    items: [
      {
        href: "/dashboard",
        icon: LayoutGrid,
        label: "Dashboard",
      },
    ],
  },
  {
    title: "Scan",
    items: [
      {
        href: "/dashboard/scan",
        icon: ScanLine,
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

const profileSection: NavigationSection = {
  items: [
    {
      href: "/dashboard/profile",
      icon: User,
      label: "Profile",
    },
  ],
};

export function Navigation() {
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >(() => Object.fromEntries(staticSections.map((_, index) => [index, true])));
  const projectsSection = useProjectsSection();

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const allSections = [...staticSections, projectsSection, profileSection];

  return (
    <nav className="sticky top-0 flex h-full flex-1 flex-col justify-between space-y-1 px-2 py-3">
      <div className="space-y-2">
        {allSections.slice(0, -1).map((section, index) => (
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
            <Separator />
          </div>
        ))}
      </div>
      <div>
        <SidebarSection section={profileSection} isExpanded={true} />
      </div>
    </nav>
  );
}
