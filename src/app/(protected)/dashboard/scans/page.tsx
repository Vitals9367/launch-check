"use client";

import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Download,
  Calendar,
  Clock,
  Filter,
  Globe,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for scan history
const mockScans = [
  {
    id: 1,
    website: "shop.example.com",
    date: "2023-04-15T10:30:00Z",
    status: "secure",
    vulnerabilities: 0,
    urls: 12,
    duration: "3m 45s",
    projectName: "E-commerce Platform",
  },
  {
    id: 2,
    website: "admin.example.com",
    date: "2023-04-14T14:45:00Z",
    status: "vulnerable",
    vulnerabilities: 3,
    urls: 8,
    duration: "2m 20s",
    projectName: "E-commerce Platform",
  },
  {
    id: 3,
    website: "support.example.com",
    date: "2023-04-12T16:20:00Z",
    status: "warning",
    vulnerabilities: 1,
    urls: 5,
    duration: "1m 50s",
    projectName: "Customer Portal",
  },
  {
    id: 4,
    website: "www.example.com",
    date: "2023-04-10T09:15:00Z",
    status: "secure",
    vulnerabilities: 0,
    urls: 15,
    duration: "4m 10s",
    projectName: "Marketing Website",
  },
  {
    id: 5,
    website: "api.example.com",
    date: "2023-04-08T11:22:00Z",
    status: "vulnerable",
    vulnerabilities: 2,
    urls: 6,
    duration: "2m 05s",
    projectName: "E-commerce Platform",
  },
  {
    id: 6,
    website: "blog.example.com",
    date: "2023-04-05T13:40:00Z",
    status: "secure",
    vulnerabilities: 0,
    urls: 9,
    duration: "3m 15s",
    projectName: "Marketing Website",
  },
];

export default function ScansPage() {
  const [filters, setFilters] = useState({
    status: "all",
    project: "all",
    dateRange: "all",
    search: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter scans based on the current filters
  const filteredScans = mockScans.filter((scan) => {
    // Filter by status
    if (filters.status !== "all" && scan.status !== filters.status) {
      return false;
    }

    // Filter by project
    if (filters.project !== "all" && scan.projectName !== filters.project) {
      return false;
    }

    // Filter by search term (website name)
    if (
      filters.search &&
      !scan.website.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Date range filtering could be added here

    return true;
  });

  // Get unique project names for the filter
  const uniqueProjects = Array.from(
    new Set(mockScans.map((scan) => scan.projectName)),
  );

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "all",
      project: "all",
      dateRange: "all",
      search: "",
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
          <p className="text-gray-500">
            View and manage your security scan results
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-red-600 hover:bg-red-700">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="relative flex-grow">
              <Input
                placeholder="Search scans..."
                className="pl-10"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>

            <div className="flex space-x-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    <Badge className="ml-2 bg-red-600" variant="secondary">
                      {(filters.status !== "all" ? 1 : 0) +
                        (filters.project !== "all" ? 1 : 0) +
                        (filters.dateRange !== "all" ? 1 : 0)}
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-medium">Filters</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={clearFilters}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Clear all
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="status-all"
                            checked={filters.status === "all"}
                            onCheckedChange={() =>
                              setFilters({ ...filters, status: "all" })
                            }
                          />
                          <label htmlFor="status-all" className="text-sm">
                            All
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="status-secure"
                            checked={filters.status === "secure"}
                            onCheckedChange={() =>
                              setFilters({ ...filters, status: "secure" })
                            }
                          />
                          <label htmlFor="status-secure" className="text-sm">
                            Secure
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="status-warning"
                            checked={filters.status === "warning"}
                            onCheckedChange={() =>
                              setFilters({ ...filters, status: "warning" })
                            }
                          />
                          <label htmlFor="status-warning" className="text-sm">
                            Warning
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="status-vulnerable"
                            checked={filters.status === "vulnerable"}
                            onCheckedChange={() =>
                              setFilters({ ...filters, status: "vulnerable" })
                            }
                          />
                          <label
                            htmlFor="status-vulnerable"
                            className="text-sm"
                          >
                            Vulnerable
                          </label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Project</Label>
                      <Select
                        value={filters.project}
                        onValueChange={(value) =>
                          setFilters({ ...filters, project: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {uniqueProjects.map((project) => (
                            <SelectItem key={project} value={project}>
                              {project}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <Select
                        value={filters.dateRange}
                        onValueChange={(value) =>
                          setFilters({ ...filters, dateRange: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Last 7 Days</SelectItem>
                          <SelectItem value="month">Last 30 Days</SelectItem>
                          <SelectItem value="quarter">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Select value="newest">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="vulnerabilities">
                    Most Vulnerabilities
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.status !== "all" ||
            filters.project !== "all" ||
            filters.dateRange !== "all" ||
            filters.search) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Status: {filters.status}
                  <button
                    onClick={() => setFilters({ ...filters, status: "all" })}
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.project !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Project: {filters.project}
                  <button
                    onClick={() => setFilters({ ...filters, project: "all" })}
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.dateRange !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Date:{" "}
                  {filters.dateRange === "today"
                    ? "Today"
                    : filters.dateRange === "week"
                      ? "Last 7 Days"
                      : filters.dateRange === "month"
                        ? "Last 30 Days"
                        : "Last 90 Days"}
                  <button
                    onClick={() => setFilters({ ...filters, dateRange: "all" })}
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.search && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  Search: {filters.search}
                  <button
                    onClick={() => setFilters({ ...filters, search: "" })}
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scans List */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
          <CardDescription>
            {filteredScans.length}{" "}
            {filteredScans.length === 1 ? "scan" : "scans"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredScans.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <h3 className="font-medium text-gray-900">
                No scan results found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your filters or run a new scan
              </p>
              <Button className="mt-4 bg-red-600 hover:bg-red-700">
                Run a New Scan
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex flex-col justify-between rounded-lg border p-4 hover:bg-gray-50 md:flex-row"
                >
                  <div className="flex items-start md:items-center">
                    {scan.status === "secure" ? (
                      <CheckCircle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-500 md:mt-0" />
                    ) : scan.status === "warning" ? (
                      <AlertTriangle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-yellow-500 md:mt-0" />
                    ) : (
                      <AlertTriangle className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-red-500 md:mt-0" />
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <h3 className="font-medium">{scan.website}</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 h-5 px-2 text-xs"
                        >
                          <Globe className="mr-1 h-3 w-3" />
                          {scan.projectName}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(scan.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {scan.duration}
                        </div>
                        <div className="flex items-center">
                          <Globe className="mr-1 h-3 w-3" />
                          {scan.urls} URLs
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-3 md:mt-0">
                    {scan.vulnerabilities > 0 ? (
                      <Badge
                        className={
                          scan.status === "vulnerable"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }
                      >
                        {scan.vulnerabilities}{" "}
                        {scan.vulnerabilities === 1 ? "issue" : "issues"}
                      </Badge>
                    ) : (
                      <Badge className="bg-green-500">Secure</Badge>
                    )}
                    <Button size="sm" variant="outline">
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredScans.length} of {mockScans.length} scans
          </div>
          {mockScans.length > 10 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
