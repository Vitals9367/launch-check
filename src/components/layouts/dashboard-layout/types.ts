import type { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  rightElement?: ReactNode;
};

export type NavigationSection = {
  title?: string;
  items: NavigationItem[];
};
