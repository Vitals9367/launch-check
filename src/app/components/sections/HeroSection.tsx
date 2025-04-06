import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, Shield, Lock, Search, Bug } from "lucide-react";

export function HeroSection() {
  return (
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
              As a fellow indie hacker, I built the security scanner I wished
              existed. Find and fix vulnerabilities in your micro-SaaS before
              hackers do.
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
  );
}
