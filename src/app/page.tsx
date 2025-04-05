"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  AlertTriangle,
  Lock,
  FileText,
  Check,
  Search,
  Bug,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { joinWaitlist } from "./actions/waitlist";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create client action wrapper
  async function handleWaitlistSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await joinWaitlist(formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        });

        // Optional: Reset form
        const form = document.getElementById(
          "waitlist-form",
        ) as HTMLFormElement;
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm">
        <div className="container mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center">
            <Shield className="mr-2 h-6 w-6 text-red-600" />
            <h1 className="text-xl font-bold">LaunchCheck</h1>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="#waitlist">
              <Button
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Join the Waitlist
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                  <span>Built by an indie hacker for indie hackers</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Security Scanning Made Simple for Your SaaS
                </h1>
                <p className="max-w-lg text-xl text-gray-600">
                  As a fellow indie hacker, I built the security scanner I
                  wished existed. Find and fix vulnerabilities in your
                  micro-SaaS before hackers do.
                </p>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Link href="#waitlist">
                    <Button className="h-12 w-full bg-red-600 px-8 text-base text-white hover:bg-red-700 sm:w-auto">
                      Join the Waitlist
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      className="h-12 w-full border-gray-300 px-8 text-base text-gray-700 sm:w-auto"
                    >
                      See How It Works
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center pt-2 text-sm text-gray-500">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>No security expertise needed</span>
                  <span className="mx-2">•</span>
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Results in 2 minutes</span>
                </div>
              </div>

              {/* Hero Graphic/Animation */}
              <div className="relative hidden lg:block">
                {/* Security Scanning Graphic */}
                <div className="relative h-[400px] w-full">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-70"></div>

                  {/* Animated Security Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-64 w-64">
                      {/* Scanning Animation */}
                      <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border-4 border-dashed border-red-300"></div>

                      {/* Scanning Line */}
                      <div className="absolute inset-[15%] animate-[spin_15s_linear_infinite_reverse] rounded-full border-4 border-red-400"></div>

                      {/* Inner Shield */}
                      <div className="absolute inset-[30%] animate-[spin_10s_linear_infinite] rounded-full border-4 border-red-500"></div>

                      {/* Shield Icon */}
                      <div className="absolute inset-[43%] z-10 rounded-full bg-white p-3 shadow-lg">
                        <Shield className="h-10 w-10 text-red-600" />
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute left-5 top-5 animate-pulse rounded-lg bg-white p-2 shadow-md">
                        <Bug className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="absolute bottom-10 right-10 animate-bounce rounded-lg bg-white p-2 shadow-md">
                        <Lock className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="absolute right-20 top-10 animate-pulse rounded-lg bg-white p-2 shadow-md">
                        <Search className="h-5 w-5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="border-y border-gray-100 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Security That Makes Sense
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                I've simplified security scanning to focus on what matters most
                for indie hackers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 p-3 text-red-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  OWASP Top 10 Coverage
                </h3>
                <p className="text-gray-600">
                  Comprehensive scanning for the most critical web application
                  security risks defined by OWASP, including injection, broken
                  authentication, and sensitive data exposure.
                </p>
              </Card>

              {/* Feature 2 */}
              <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 p-3 text-orange-600">
                  <Bug className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  XSS & Injection Detection
                </h3>
                <p className="text-gray-600">
                  Advanced detection of cross-site scripting, SQL injection, and
                  other common attack vectors that could compromise your
                  application and user data.
                </p>
              </Card>

              {/* Feature 3 */}
              <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 p-3 text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Actionable Reports
                </h3>
                <p className="text-gray-600">
                  Receive clear, step-by-step remediation guides to fix each
                  vulnerability found, with code examples and best practices
                  tailored for indie hackers.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Simple Security Scanning
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Get actionable security insights without needing a security
                background
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                      1
                    </div>
                  </div>
                  <div className="absolute left-full top-8 hidden h-0.5 w-full bg-red-100 md:block"></div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Enter Your URL</h3>
                <p className="text-gray-600">
                  Simply enter your website or application URL to start the
                  security scan.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                      2
                    </div>
                  </div>
                  <div className="absolute left-full top-8 hidden h-0.5 w-full bg-red-100 md:block"></div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Automated Security Scan
                </h3>
                <p className="text-gray-600">
                  The tool checks for OWASP Top 10 vulnerabilities and other
                  security issues.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                    3
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Get Security Report
                </h3>
                <p className="text-gray-600">
                  Review your security report with clear steps to fix each
                  vulnerability found.
                </p>
              </div>
            </div>

            {/* Example Security Report */}
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
                    <div className="text-sm text-gray-600">
                      3 vulnerabilities found
                    </div>
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
                        <h5 className="font-medium">
                          Cross-Site Scripting (XSS)
                        </h5>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Found potential XSS vulnerability in your search form
                        that could allow attackers to inject malicious scripts.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-red-600"
                        >
                          How to fix this →
                        </Button>
                      </div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="flex items-center">
                        <div className="mr-2 rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                          Medium
                        </div>
                        <h5 className="font-medium">
                          Missing Content Security Policy
                        </h5>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Your site doesn't have a Content Security Policy header,
                        which helps prevent XSS attacks.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-red-600"
                        >
                          How to fix this →
                        </Button>
                      </div>
                    </div>
                    <div className="rounded border p-3">
                      <div className="flex items-center">
                        <div className="mr-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                          Low
                        </div>
                        <h5 className="font-medium">
                          Insecure Cookie Configuration
                        </h5>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        Cookies are set without secure flags, potentially
                        exposing session data.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs text-red-600"
                        >
                          How to fix this →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Founder Section */}
        <section className="border-y border-gray-100 bg-white px-4 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  <span>Why I Built This</span>
                </div>
                <h2 className="text-3xl font-bold md:text-4xl">
                  Hey, I'm Vitalijus 👋
                </h2>
                <p className="text-xl text-gray-600">
                  After launching multiple SaaS products, I realized security
                  was always an afterthought - it was either too complex or too
                  expensive to implement properly.
                </p>
                <div className="space-y-4 text-gray-600">
                  <p>
                    I've spent years working with enterprise security tools and
                    saw how inaccessible they were for indie hackers and small
                    teams. That's why I built LaunchCheck - to make security
                    scanning accessible, understandable, and actionable.
                  </p>
                  <p>
                    No enterprise complexity. No security expertise needed. Just
                    clear, actionable insights to keep your SaaS secure.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="https://x.com/alsauskas_v"
                    className="text-red-600 hover:text-red-700"
                  >
                    Follow my journey →
                  </Link>
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="relative flex justify-center">
                <div className="relative aspect-square w-[80%] overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-2">
                  {/* Add your profile image here */}
                  <img
                    src="/profile.png" // Make sure to add your image to the public folder
                    alt="Vitalijus Alsauskas"
                    className="h-full w-full rounded-xl object-cover"
                  />

                  {/* Decorative elements */}
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-red-100/50 blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-orange-100/50 blur-2xl"></div>

                  {/* Social proof badge */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Vitalijus Alsauskas</p>
                        <p className="text-sm text-gray-600">
                          Indie Hacker & Software Developer
                        </p>
                      </div>
                      <Link
                        href="https://x.com/alsauskas_v"
                        className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section
          id="waitlist"
          className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-20"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  <span>Early Access</span>
                </div>
                <h2 className="text-3xl font-bold md:text-4xl">
                  Join the Indie Hackers Security Movement
                </h2>
                <p className="text-xl text-gray-600">
                  Be part of making security accessible for indie hackers
                  everywhere
                </p>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span className="font-medium">Limited spots available</span>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold">Reserve Your Spot</h3>
                  <form
                    id="waitlist-form"
                    onSubmit={handleWaitlistSubmission}
                    className="space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Joining...
                        </>
                      ) : (
                        "Join the Waitlist"
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              <div className="space-y-6 md:pl-8">
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-semibold">What You'll Get</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Early Access</p>
                        <p className="text-sm text-gray-600">
                          Be the first to try the security scanner built for
                          indie hackers
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Indie Hacker Pricing</p>
                        <p className="text-sm text-gray-600">
                          Lock in special early supporter pricing forever
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Direct Access</p>
                        <p className="text-sm text-gray-600">
                          Shape the product with direct feedback to me
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300"></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Joined this week</p>
                      <p className="text-gray-500">
                        From Indie Hackers, Product Hunt, and Twitter
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                      <span>
                        "Found 3 critical XSS vulnerabilities in my first scan!"
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                      <span>
                        "Security has been on my todo list for months."
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                      <span>
                        "Finally, security scanning I can actually understand."
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 px-4 py-12">
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>
            Built with ❤️ by an indie hacker for indie hackers. &copy;{" "}
            {new Date().getFullYear()} LaunchCheck
          </p>
        </div>
      </footer>
    </div>
  );
}
