"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./types";

export function SidebarItem({ item }: { item: NavigationItem }) {
  const Icon = item.icon;
  const pathname = usePathname();

  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
      )}
    >
      <Icon className="mr-3 h-4 w-4" />
      {item.label}
    </Link>
  );
}
