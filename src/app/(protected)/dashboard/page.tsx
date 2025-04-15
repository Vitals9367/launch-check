import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle,
  Globe,
  Clock,
  Plus,
  BarChart,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const recentScans = [
  {
    id: 1,
    website: "shop.example.com",
    date: "2023-04-15T10:30:00Z",
    status: "secure",
    vulnerabilities: 0,
  },
  {
    id: 2,
    website: "admin.example.com",
    date: "2023-04-14T14:45:00Z",
    status: "vulnerable",
    vulnerabilities: 3,
  },
  {
    id: 3,
    website: "support.example.com",
    date: "2023-04-12T16:20:00Z",
    status: "warning",
    vulnerabilities: 1,
  },
  {
    id: 4,
    website: "www.example.com",
    date: "2023-04-10T09:15:00Z",
    status: "secure",
    vulnerabilities: 0,
  },
];

// Mock websites data
const mockWebsites = [
  {
    id: 101,
    name: "Shop Frontend",
    url: "https://shop.example.com",
    lastScan: "2023-04-15T10:30:00Z",
    status: "secure",
    vulnerabilities: 0,
  },
  {
    id: 102,
    name: "Admin Dashboard",
    url: "https://admin.example.com",
    lastScan: "2023-04-14T14:45:00Z",
    status: "vulnerable",
    vulnerabilities: 3,
  },
  {
    id: 301,
    name: "Support Portal",
    url: "https://support.example.com",
    lastScan: "2023-04-12T16:20:00Z",
    status: "warning",
    vulnerabilities: 1,
  },
];

// Calculate summary statistics
const totalWebsites = mockWebsites.length;
const totalUrls = 18;
const totalVulnerabilities = mockWebsites.reduce(
  (sum, website) => sum + website.vulnerabilities,
  0,
);

export default function DashboardPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div>
      {/* Dashboard Content */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Monitor your website security</p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <Link href="/dashboard/websites">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Website
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats overview */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Websites</p>
                <h3 className="text-2xl font-bold">{totalWebsites}</h3>
              </div>
              <div className="rounded-full bg-purple-50 p-2">
                <Globe className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  URLs Scanned
                </p>
                <h3 className="text-2xl font-bold">{totalUrls}</h3>
              </div>
              <div className="rounded-full bg-green-50 p-2">
                <BarChart className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Vulnerabilities
                </p>
                <h3 className="text-2xl font-bold">{totalVulnerabilities}</h3>
              </div>
              <div className="rounded-full bg-red-50 p-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
          <TabsTrigger value="scans">Recent Scans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Security Score */}
          <Card>
            <CardHeader>
              <CardTitle>Security Score</CardTitle>
              <CardDescription>
                Overall security rating across all your websites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-2xl font-bold text-yellow-800">
                  B
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">75/100</span>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  {totalVulnerabilities} issues need attention across your
                  websites
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Scans */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                Latest security scans across your websites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center">
                      {scan.status === "secure" ? (
                        <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                      ) : scan.status === "warning" ? (
                        <AlertTriangle className="mr-3 h-5 w-5 text-yellow-500" />
                      ) : (
                        <AlertTriangle className="mr-3 h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <Link
                          href={`/dashboard/websites/${scan.id}`}
                          className="font-medium hover:underline"
                        >
                          {scan.website}
                        </Link>
                        <p className="text-xs text-gray-500">
                          {formatDate(scan.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Link
                  href="/dashboard/scans"
                  className="flex w-full items-center justify-center"
                >
                  View All Scans
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="websites" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Websites</CardTitle>
              <CardDescription>Manage your security websites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWebsites.map((website) => (
                  <Link
                    key={website.id}
                    href={`/dashboard/websites/${website.id}`}
                  >
                    <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100">
                      <div className="flex items-center">
                        {website.status === "secure" ? (
                          <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                        ) : website.status === "warning" ? (
                          <AlertTriangle className="mr-3 h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="mr-3 h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{website.name}</p>
                          <p className="text-xs text-gray-500">{website.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {website.vulnerabilities > 0 ? (
                          <Badge
                            className={
                              website.status === "vulnerable"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }
                          >
                            {website.vulnerabilities}{" "}
                            {website.vulnerabilities === 1 ? "issue" : "issues"}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-500">Secure</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Link
                  href="/dashboard/websites"
                  className="flex w-full items-center justify-center"
                >
                  View All Websites
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scans" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>
                View all security scans across your websites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <Clock className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <h3 className="font-medium text-gray-900">View scan history</h3>
                <p className="mt-1 text-gray-500">
                  Go to the Scan History page to see all your scans
                </p>
                <Link href="/dashboard/scans">
                  <Button className="mt-4">View Scan History</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
