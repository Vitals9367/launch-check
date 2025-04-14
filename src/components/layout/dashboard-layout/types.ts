import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export type NavigationSection = {
  title?: string;
  items: NavigationItem[];
};
