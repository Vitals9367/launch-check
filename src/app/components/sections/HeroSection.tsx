import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  AlertTriangle,
  Bug,
  Key,
  Scan,
  FileWarning,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="scroll-disabled relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8 py-16 md:py-24 lg:py-32">
            <div className="inline-flex items-center rounded-full bg-red-100/80 px-2.5 py-1.5 text-[13px] text-red-700 backdrop-blur-sm sm:px-3 sm:text-sm">
              <Shield className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">
                For Indie SaaS Founders & Small Teams
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Ship Fast Without Getting Hacked
            </h1>
            <p className="max-w-lg text-xl text-gray-600">
              Get peace of mind with automated security tests that run 24/7,
              catching vulnerabilities while you focus on building your product.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#waitlist">
                <Button className="h-12 w-full bg-red-600 px-8 text-base font-medium text-white hover:bg-red-700 sm:w-auto">
                  Get Early Access →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Graphic/Animation */}
      <div
        className="absolute bottom-0 top-0 hidden lg:block"
        style={{ left: "55%", right: "0" }}
      >
        <div className="relative h-full w-full">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>
          <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-red-100/50 blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-orange-100/50 blur-2xl"></div>

          {/* Main Security Shield */}
          <div className="absolute inset-0 flex items-center justify-start pl-56">
            <div className="relative">
              {/* Outermost Ring - Slow Scan */}
              <div className="absolute -inset-24 animate-[spin_25s_linear_infinite] rounded-full border border-red-100/40 sm:-inset-24 md:-inset-20 lg:-inset-32"></div>

              {/* Radar Sweep Effect */}
              <div className="absolute -inset-24 animate-[spin_4s_linear_infinite] overflow-hidden rounded-full sm:-inset-24 md:-inset-20 lg:-inset-32">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-red-100/20 to-transparent"></div>
              </div>

              {/* Large Scanning Ring */}
              <div className="absolute -inset-20 animate-[spin_18s_linear_infinite_reverse] rounded-full border-2 border-dashed border-red-200/40 sm:-inset-20 md:-inset-16 lg:-inset-28"></div>

              {/* Medium Scanning Ring */}
              <div className="absolute -inset-16 animate-[spin_15s_linear_infinite] rounded-full border border-red-300/30 sm:-inset-16 md:-inset-12 lg:-inset-24"></div>

              {/* Pulse Ring 1 */}
              <div className="absolute -inset-12 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2 border-red-400/20 sm:-inset-12 md:-inset-10 lg:-inset-20"></div>

              {/* Pulse Ring 2 */}
              <div className="absolute -inset-12 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_500ms] rounded-full border-2 border-red-400/20 sm:-inset-12 md:-inset-10 lg:-inset-20"></div>

              {/* Inner Scanning Ring */}
              <div className="absolute -inset-8 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-red-400/30 sm:-inset-8 md:-inset-6 lg:-inset-16"></div>

              {/* Close Range Scan */}
              <div className="absolute -inset-4 animate-[spin_8s_linear_infinite] rounded-full border border-red-500/40 sm:-inset-4 md:-inset-3 lg:-inset-12"></div>

              {/* Center Shield */}
              <div className="relative h-24 w-24 rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 sm:h-24 sm:w-24 sm:p-6 md:h-20 md:w-20 md:p-5 lg:h-32 lg:w-32 lg:p-8">
                <Shield className="h-full w-full text-red-600" />
              </div>

              {/* Floating Security Elements */}
              <div className="absolute -right-16 -top-20 animate-bounce sm:-right-16 sm:-top-20 md:-right-14 md:-top-16 lg:-right-20 lg:-top-24">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <Lock className="h-5 w-5 text-green-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
              <div className="absolute -bottom-24 -left-14 animate-bounce [animation-delay:200ms] sm:-bottom-24 sm:-left-14 md:-bottom-20 md:-left-12 lg:-bottom-32 lg:-left-20">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
              <div className="absolute -left-24 top-6 animate-bounce [animation-delay:400ms] sm:-left-24 sm:top-6 md:-left-20 md:top-5 lg:-left-32 lg:top-8">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <Bug className="h-5 w-5 text-orange-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
              <div className="absolute -top-16 right-20 animate-bounce [animation-delay:600ms] sm:-top-16 sm:right-20 md:-top-14 md:right-16 lg:-top-20 lg:right-24">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <Key className="h-5 w-5 text-blue-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-24 animate-bounce [animation-delay:800ms] sm:-bottom-4 sm:-right-24 md:-bottom-3 md:-right-20 lg:-bottom-8 lg:-right-32">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <Scan className="h-5 w-5 text-purple-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
              <div className="absolute -bottom-10 -left-20 animate-bounce [animation-delay:1000ms] sm:-bottom-10 sm:-left-20 md:-bottom-8 md:-left-16 lg:-bottom-16 lg:-left-24">
                <div className="rounded-lg bg-white p-2 shadow-md sm:p-2 md:p-1.5 lg:p-3">
                  <FileWarning className="h-5 w-5 text-yellow-500 sm:h-5 sm:w-5 md:h-4 md:w-4 lg:h-6 lg:w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
