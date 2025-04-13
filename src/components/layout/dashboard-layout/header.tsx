"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { UserButton } from "@/components/molecules/user-button";

type HeaderProps = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo and mobile menu button */}
        <div className="flex items-center">
          <button
            className="mr-2 rounded-md p-2 hover:bg-gray-100 lg:hidden"
            onClick={onToggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link
            href="/dashboard"
            className="flex items-center rounded-lg px-3 py-2 hover:bg-gray-50"
          >
            <Shield className="mr-2 h-6 w-6 text-red-600" />
            <h1 className="hidden text-xl font-bold sm:inline-block">
              Launch Check
            </h1>
          </Link>
        </div>

        {/* User menu */}
        <UserButton />
      </div>
    </header>
  );
}
