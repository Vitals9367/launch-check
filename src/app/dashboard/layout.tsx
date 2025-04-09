"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Search, User, ChevronDown, Grid, Globe, Clock, Settings, LogOut, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              className="lg:hidden mr-2 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/dashboard" className="flex items-center">
              <Shield className="h-6 w-6 text-red-600 mr-2" />
              <h1 className="text-xl font-bold hidden sm:inline-block">LaunchCheck</h1>
            </Link>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" />
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 flex flex-col z-20 
            ${sidebarOpen ? "fixed inset-y-0 left-0 lg:static transform translate-x-0" : "transform -translate-x-full lg:transform-none lg:static"} 
            transition-transform duration-200 ease-in-out lg:translate-x-0 pt-16 lg:pt-0`}
        >
          <nav className="flex-1 px-2 py-4 space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/dashboard" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Grid className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/websites"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/dashboard/websites" || pathname.startsWith("/dashboard/websites/")
                  ? "bg-red-50 text-red-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Globe className="mr-3 h-5 w-5" />
              Websites
            </Link>
            <Link
              href="/dashboard/scans"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/dashboard/scans" || pathname.startsWith("/dashboard/scans/")
                  ? "bg-red-50 text-red-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Clock className="mr-3 h-5 w-5" />
              Scan History
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/dashboard/settings" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/dashboard/profile" ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
