"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./types";

export function SidebarItem({ item }: { item: NavigationItem }) {
  const Icon = item.icon;
  const pathname = usePathname();

  const isActive = item.isActive ?? pathname === item.href;

  const content = (
    <>
      <div className="flex flex-1 items-center">
        <Icon className="mr-3 h-4 w-4" />
        {item.label}
      </div>
      {item.rightElement && <div className="ml-2">{item.rightElement}</div>}
    </>
  );

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cn(
          "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-red-50 text-red-700 hover:bg-red-100"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
      )}
    >
      {content}
    </Link>
  );
}
