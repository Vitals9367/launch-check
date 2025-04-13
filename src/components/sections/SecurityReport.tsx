import { Shield } from "lucide-react";
import React from "react";
import Link from "next/link";

const SecurityReportSection = () => {
  return (
    <div className="mt-16 overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="border-b bg-gray-50 p-4">
        <div className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-red-600" />
          <span className="font-medium">Sample Security Report</span>
        </div>
      </div>
      <div className="grid divide-y md:grid-cols-5 md:divide-x md:divide-y-0">
        <div className="bg-gray-50 p-4 md:col-span-2">
          <h4 className="mb-3 font-semibold">Your Security Score</h4>
          <div className="mb-6 flex items-center">
            <div className="mr-2 rounded bg-yellow-100 px-3 py-1 text-xl font-bold text-yellow-700">
              C
            </div>
            <div className="text-sm text-gray-600">3 vulnerabilities found</div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium">High Risk Issues</p>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Medium Risk Issues</p>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Low Risk Issues</p>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 md:col-span-3">
          <h4 className="mb-3 font-semibold">Vulnerabilities Found</h4>
          <div className="space-y-4">
            <div className="rounded border p-3">
              <div className="flex items-center">
                <div className="mr-2 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                  High
                </div>
                <h5 className="font-medium">Cross-Site Scripting (XSS)</h5>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Found potential XSS vulnerability in your search form that could
                allow attackers to inject malicious scripts.
              </p>
              <div className="mt-2">
                <Link
                  href="#waitlist"
                  className="text-xs font-medium text-red-600 transition-colors hover:text-red-700"
                >
                  How to fix this →
                </Link>
              </div>
            </div>
            <div className="rounded border p-3">
              <div className="flex items-center">
                <div className="mr-2 rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                  Medium
                </div>
                <h5 className="font-medium">Missing Content Security Policy</h5>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Your site doesn't have a Content Security Policy header, which
                helps prevent XSS attacks.
              </p>
              <div className="mt-2">
                <Link
                  href="#waitlist"
                  className="text-xs font-medium text-red-600 transition-colors hover:text-red-700"
                >
                  How to fix this →
                </Link>
              </div>
            </div>
            <div className="rounded border p-3">
              <div className="flex items-center">
                <div className="mr-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                  Low
                </div>
                <h5 className="font-medium">Insecure Cookie Configuration</h5>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                Cookies are set without secure flags, potentially exposing
                session data.
              </p>
              <div className="mt-2">
                <Link
                  href="#waitlist"
                  className="text-xs font-medium text-red-600 transition-colors hover:text-red-700"
                >
                  How to fix this →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityReportSection;
