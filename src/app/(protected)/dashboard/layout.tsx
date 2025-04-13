"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Search,
  Grid,
  Globe,
  Clock,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserMenu } from "@/components/user-menu";

const navigationItems = [
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
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              className="mr-2 rounded-md p-2 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              href="/dashboard"
              className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <Shield className="mr-2 h-6 w-6 text-red-600" />
              <h1 className="hidden text-xl font-bold sm:inline-block">
                LaunchCheck
              </h1>
            </Link>
          </div>

          {/* Search */}
          <div className="mx-4 hidden max-w-md flex-1 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search..."
                className="border-gray-200 bg-gray-50 pl-10 focus:bg-white"
              />
            </div>
          </div>

          {/* User menu */}
          <UserMenu />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`z-20 flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white ${
            sidebarOpen
              ? "fixed inset-y-0 left-0 translate-x-0 transform lg:static"
              : "-translate-x-full transform lg:static lg:transform-none"
          } pt-16 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:pt-0`}
        >
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
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
