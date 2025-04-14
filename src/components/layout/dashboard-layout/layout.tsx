"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/organisms/loading-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useCurrentUser();

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="fixed left-0 right-0 top-0 z-30">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={sidebarOpen} />

        <div className="flex-1">
          <main className="relative h-[calc(100vh-4rem)] overflow-y-auto p-4 lg:p-6">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
