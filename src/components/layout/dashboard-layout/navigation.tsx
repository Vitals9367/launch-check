"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Globe, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavigationItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    icon: Grid,
    label: "Dashboard",
  },
  {
    href: "/dashboard/websites",
    icon: Globe,
    label: "Websites",
  },
  {
    href: "/dashboard/scans",
    icon: Clock,
    label: "Scan History",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-red-50 text-red-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
