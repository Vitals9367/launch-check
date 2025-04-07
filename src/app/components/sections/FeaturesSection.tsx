"use client";

import {
  Shield,
  Zap,
  Code2,
  DollarSign,
  Clock,
  Wrench,
  Bug,
  FileText,
  CheckCircle2,
  Gauge,
  Bell,
  ShieldCheck,
  Database,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Complete Security Coverage",
    description:
      "Know your site is protected against all major security threats",
    benefits: [
      "Protection against OWASP Top 10 threats",
      "Coverage of CWE Top 25 weaknesses",
      "SANS Top 25 security risks checked",
      "Zero-day vulnerability detection",
      "Framework-specific security rules",
    ],
    problems: [
      "Stop worrying about SQL injections",
      "Prevent XSS attacks before they happen",
      "Catch authentication vulnerabilities early",
      "Identify data exposure risks",
      "Detect security misconfigurations",
    ],
    color: "red",
  },
  {
    icon: Gauge,
    title: "Test When You Need",
    description: "Run security checks that fit your development workflow",
    benefits: [
      "Instant on-demand scanning",
      "Automated checks after deploys",
      "CI/CD pipeline integration",
      "Scheduled nightly scans",
      "Quick 5-minute scans available",
    ],
    problems: [
      "No more waiting for security reviews",
      "Deploy with confidence",
      "Catch issues before users do",
      "Prevent production incidents",
      "Save time on manual testing",
    ],
    color: "orange",
  },
  {
    icon: Bell,
    title: "Stay Informed, Stay Secure",
    description: "Never miss a security issue with smart alerts",
    benefits: [
      "Real-time vulnerability alerts",
      "Slack/Discord notifications",
      "Daily security summaries",
      "Trend analysis reports",
      "Custom alert rules",
    ],
    problems: [
      "Stop checking security logs manually",
      "Never miss critical vulnerabilities",
      "Reduce alert fatigue",
      "Focus on real threats",
      "Keep your team informed",
    ],
    color: "blue",
  },
  {
    icon: FileText,
    title: "Clear Action Steps",
    description: "Get fixes, not just findings",
    benefits: [
      "Step-by-step fix instructions",
      "Code examples included",
      "Best practice recommendations",
      "Framework-specific solutions",
      "Priority-based fixes",
    ],
    problems: [
      "No more guessing how to fix issues",
      "Save time researching solutions",
      "Fix vulnerabilities correctly",
      "Prevent recurring issues",
      "Learn security best practices",
    ],
    color: "green",
  },
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentFeature = features[activeTab];

  if (!currentFeature) return null;

  return (
    <section className="bg-gray-900 px-4 py-24 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Powerful Security Made Simple
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Find and fix security issues in three easy steps, without becoming a
            security expert
          </p>
        </div>

        {/* How it Works Steps */}
        <div className="mb-24">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold">
                    1
                  </div>
                </div>
                <div className="absolute left-full top-8 hidden h-0.5 w-full -translate-y-1/2 bg-gray-800 md:block"></div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Connect Your Site</h3>
              <p className="text-gray-300">
                Enter your website URL and configure your testing preferences
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold">
                    2
                  </div>
                </div>
                <div className="absolute left-full top-8 hidden h-0.5 w-full -translate-y-1/2 bg-gray-800 md:block"></div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Launch Tests</h3>
              <p className="text-gray-300">
                Run automated security checks covering OWASP, CWE, and SANS
                vulnerabilities
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold">
                    3
                  </div>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Fix & Improve</h3>
              <p className="text-gray-300">
                Get clear, actionable steps to fix any vulnerabilities found
              </p>
            </div>
          </div>
        </div>

        {/* Features Tabs */}
        <div className="relative">
          <div className="rounded-xl bg-gray-800">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-700 p-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all",
                    activeTab === index
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  )}
                >
                  <feature.icon className="h-5 w-5" />
                  <span className="hidden md:inline">{feature.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="rounded-xl bg-gray-700 p-3">
                  <currentFeature.icon className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">
                    {currentFeature.title}
                  </h3>
                  <p className="mt-2 text-lg text-gray-300">
                    {currentFeature.description}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="rounded-xl bg-gray-700/50 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {currentFeature.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
