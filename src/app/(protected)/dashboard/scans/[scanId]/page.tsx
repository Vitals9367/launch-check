"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Share2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Globe,
  LinkIcon,
  ExternalLink,
  FileText,
  Shield,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Vulnerability } from "@/types/scanner";

// Mock scan data
const mockScanData = {
  id: "scan-123456",
  website: {
    id: 102,
    name: "Admin Dashboard",
    url: "https://admin.example.com",
  },
  date: "2023-04-14T14:45:00Z",
  duration: "2m 20s",
  status: "vulnerable",
  vulnerabilities: [
    {
      name: "Cross-Site Scripting (XSS)",
      risk: "High",
      description:
        "Found potential XSS vulnerability that could allow attackers to inject malicious scripts.",
      location: "/search?q=<script>alert(1)</script>",
      cweid: "CWE-79",
      remedy:
        "Implement proper input validation and output encoding. Use frameworks that automatically escape XSS by design, such as React, Angular, or Vue. Consider implementing a Content Security Policy (CSP).",
      evidence: "<script>alert(1)</script>",
      impact:
        "Attackers can execute arbitrary JavaScript in a user's browser, potentially stealing cookies, session tokens or other sensitive information, or perform actions impersonating the user.",
      references: [
        "https://owasp.org/www-community/attacks/xss/",
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      ],
    },
    {
      name: "SQL Injection",
      risk: "High",
      description:
        "SQL injection vulnerability that could allow attackers to manipulate database queries.",
      location: "/users?id=1' OR '1'='1",
      cweid: "CWE-89",
      remedy:
        "Use parameterized queries or prepared statements instead of concatenating user input into SQL queries. Implement an ORM (Object-Relational Mapping) framework that handles SQL escaping automatically. Apply the principle of least privilege to database accounts.",
      evidence:
        "ERROR: unterminated quoted string at or near \"'\" LINE 1: SELECT * FROM users WHERE id = '1' OR '1'='",
      impact:
        "Attackers can bypass authentication, extract sensitive data, modify database contents, or even execute administrative operations on the database server.",
      references: [
        "https://owasp.org/www-community/attacks/SQL_Injection",
        "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      ],
    },
    {
      name: "Insecure Cookie",
      risk: "Medium",
      description:
        "Cookies set without secure and HttpOnly flags expose sensitive information.",
      location: "Set-Cookie: auth=token123; path=/",
      cweid: "CWE-614",
      remedy:
        "Set both 'Secure' and 'HttpOnly' flags on all cookies containing sensitive information. For example: Set-Cookie: auth=token123; path=/; Secure; HttpOnly",
      evidence: "Set-Cookie: auth=token123; path=/",
      impact:
        "Cookies without the Secure flag can be transmitted over unencrypted connections, potentially exposing sensitive information. Cookies without the HttpOnly flag can be accessed via JavaScript, making them vulnerable to XSS attacks.",
      references: [
        "https://owasp.org/www-community/controls/SecureCookieAttribute",
        "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#secure-attribute",
      ],
    },
  ],
  scannedUrls: [
    { path: "/", vulnerabilities: 0, status: "secure" },
    { path: "/login", vulnerabilities: 0, status: "secure" },
    { path: "/admin", vulnerabilities: 1, status: "vulnerable" },
    { path: "/users", vulnerabilities: 2, status: "vulnerable" },
    { path: "/products", vulnerabilities: 0, status: "secure" },
    { path: "/orders", vulnerabilities: 0, status: "secure" },
    { path: "/settings", vulnerabilities: 0, status: "secure" },
    { path: "/api/users", vulnerabilities: 0, status: "secure" },
  ],
  securityScore: {
    score: "D",
    value: 35,
    label: "Poor",
    description: "Serious security vulnerabilities detected",
  },
};

export default function ScanReportPage() {
  const params = useParams();
  const scanId = params.scanId as string;
  const scan = mockScanData; // In a real app, fetch the scan data based on scanId

  const [isRescanning, setIsRescanning] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleRescan = () => {
    setIsRescanning(true);
    // In a real app, trigger a new scan
    setTimeout(() => {
      setIsRescanning(false);
    }, 2000);
  };

  const handleDownloadReport = () => {
    // In a real app, download the report
    alert("Downloading report...");
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case "A+":
      case "A":
        return "text-green-600 bg-green-50 border-green-200";
      case "B":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "C":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "D":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "F":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "secure":
        return <Badge className="bg-green-500">Secure</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case "vulnerable":
        return <Badge className="bg-red-500">Vulnerable</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secure":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "vulnerable":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const highVulnerabilities = scan.vulnerabilities.filter(
    (v) => v.risk === "High",
  ).length;
  const mediumVulnerabilities = scan.vulnerabilities.filter(
    (v) => v.risk === "Medium",
  ).length;
  const lowVulnerabilities = scan.vulnerabilities.filter(
    (v) => v.risk === "Low",
  ).length;

  return (
    <div>
      {/* Breadcrumb and actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center">
            <Link
              href="/dashboard/scans"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Back to Scans</span>
            </Link>
          </div>
          <h1 className="flex items-center text-2xl font-bold text-gray-900">
            {getStatusIcon(scan.status)}
            <span className="ml-2">Scan Report: {scan.website.name}</span>
          </h1>
          <div className="mt-1 flex items-center">
            <Link
              href={`/dashboard/websites/${scan.website.id}`}
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <Globe className="mr-1 h-4 w-4" />
              {scan.website.name}
            </Link>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">
              {formatDate(scan.date)}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleRescan}
            disabled={isRescanning}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRescanning ? "animate-spin" : ""}`}
            />
            {isRescanning ? "Rescanning..." : "Rescan"}
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Scan Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Scan Overview</CardTitle>
          <CardDescription>
            Summary of the security scan results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="mr-3 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Website URL</p>
                    <p className="flex items-center font-medium">
                      {scan.website.url}
                      <a
                        href={scan.website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Scan Date</p>
                    <p className="font-medium">{formatDate(scan.date)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Scan Duration</p>
                    <p className="font-medium">{scan.duration}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <LinkIcon className="mr-3 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">URLs Scanned</p>
                    <p className="font-medium">
                      {scan.scannedUrls.length} URLs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col items-center">
                <div
                  className={`mb-4 rounded-lg p-6 text-center ${getScoreColor(scan.securityScore.score)}`}
                >
                  <div className="mb-2 flex items-center justify-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-4xl font-bold ${getScoreColor(scan.securityScore.score)}`}
                    >
                      {scan.securityScore.score}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">
                    {scan.securityScore.label} Security Rating
                  </h3>
                  <p className="mt-1 text-sm">
                    {scan.securityScore.description}
                  </p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>High Risk Issues</span>
                    <span className="font-medium">{highVulnerabilities}</span>
                  </div>
                  <Progress
                    value={highVulnerabilities > 0 ? 100 : 0}
                    className="h-2 bg-gray-100"
                  />

                  <div className="flex justify-between text-sm">
                    <span>Medium Risk Issues</span>
                    <span className="font-medium">{mediumVulnerabilities}</span>
                  </div>
                  <Progress
                    value={mediumVulnerabilities > 0 ? 100 : 0}
                    className="h-2 bg-gray-100"
                  />

                  <div className="flex justify-between text-sm">
                    <span>Low Risk Issues</span>
                    <span className="font-medium">{lowVulnerabilities}</span>
                  </div>
                  <Progress
                    value={lowVulnerabilities > 0 ? 100 : 0}
                    className="h-2 bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="vulnerabilities" className="mb-6">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="urls">Scanned URLs</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vulnerabilities Found</CardTitle>
              <CardDescription>
                {scan.vulnerabilities.length === 0
                  ? "No vulnerabilities were detected in this scan"
                  : `${scan.vulnerabilities.length} vulnerabilities were found in this scan`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scan.vulnerabilities.length === 0 ? (
                <div className="py-8 text-center">
                  <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
                  <h3 className="font-medium text-gray-900">All Clear!</h3>
                  <p className="mt-1 text-gray-500">
                    No vulnerabilities were detected in this scan
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scan.vulnerabilities.map((vulnerability, index) => (
                    <VulnerabilityCard
                      key={index}
                      vulnerability={vulnerability as Vulnerability}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urls" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scanned URLs</CardTitle>
              <CardDescription>
                {scan.scannedUrls.length} URLs were scanned during this security
                check
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scan.scannedUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center">
                      {url.status === "secure" ? (
                        <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                      ) : url.status === "warning" ? (
                        <AlertTriangle className="mr-3 h-4 w-4 text-yellow-500" />
                      ) : (
                        <AlertTriangle className="mr-3 h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {scan.website.url}
                          {url.path}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {url.vulnerabilities > 0 ? (
                        <Badge
                          className={
                            url.status === "vulnerable"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }
                        >
                          {url.vulnerabilities}{" "}
                          {url.vulnerabilities === 1 ? "issue" : "issues"}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500">Secure</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
              <CardDescription>
                Actionable steps to improve your website security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {scan.vulnerabilities.length > 0 ? (
                  scan.vulnerabilities.map((vulnerability, index) => (
                    <div
                      key={index}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <h3 className="mb-2 flex items-center text-lg font-medium">
                        <Shield className="mr-2 h-5 w-5 text-blue-500" />
                        Fix: {vulnerability.name}
                      </h3>
                      <p className="mb-3 text-gray-700">
                        {vulnerability.remedy}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="mr-1 h-4 w-4" />
                        <span>Reference: </span>
                        <a
                          href={vulnerability.references[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-600 hover:underline"
                        >
                          OWASP Documentation
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
                    <h3 className="font-medium text-gray-900">Great job!</h3>
                    <p className="mt-1 text-gray-500">
                      Your website is secure. Continue to monitor regularly.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                These recommendations are based on industry best practices and
                the OWASP Top 10 security risks.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
