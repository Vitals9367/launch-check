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
    <section className="px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>For Indie SaaS Founders & Small Teams</span>
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

          {/* Hero Graphic/Animation */}
          <div className="relative hidden lg:block">
            <div className="relative h-[400px] w-full">
              {/* Background Elements */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-red-100/50 blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-orange-100/50 blur-2xl"></div>

              {/* Main Security Shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outermost Ring - Slow Scan */}
                  <div className="absolute -inset-24 animate-[spin_25s_linear_infinite] rounded-full border border-red-100/40"></div>

                  {/* Radar Sweep Effect */}
                  <div className="absolute -inset-24 animate-[spin_4s_linear_infinite] overflow-hidden rounded-full">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-red-100/20 to-transparent"></div>
                  </div>

                  {/* Large Scanning Ring */}
                  <div className="absolute -inset-20 animate-[spin_18s_linear_infinite_reverse] rounded-full border-2 border-dashed border-red-200/40"></div>

                  {/* Medium Scanning Ring */}
                  <div className="absolute -inset-16 animate-[spin_15s_linear_infinite] rounded-full border border-red-300/30"></div>

                  {/* Pulse Ring 1 */}
                  <div className="absolute -inset-12 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full border-2 border-red-400/20"></div>

                  {/* Pulse Ring 2 */}
                  <div className="absolute -inset-12 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_500ms] rounded-full border-2 border-red-400/20"></div>

                  {/* Inner Scanning Ring */}
                  <div className="absolute -inset-8 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-red-400/30"></div>

                  {/* Close Range Scan */}
                  <div className="absolute -inset-4 animate-[spin_8s_linear_infinite] rounded-full border border-red-500/40"></div>

                  {/* Center Shield */}
                  <div className="relative h-24 w-24 rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
                    <Shield className="h-full w-full text-red-600" />
                  </div>

                  {/* Floating Security Elements */}
                  <div className="absolute -right-16 -top-20 animate-bounce">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <Lock className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <div className="absolute -bottom-24 -left-14 animate-bounce [animation-delay:200ms]">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                  <div className="absolute -left-24 top-6 animate-bounce [animation-delay:400ms]">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <Bug className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                  <div className="absolute -top-16 right-20 animate-bounce [animation-delay:600ms]">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <Key className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-24 animate-bounce [animation-delay:800ms]">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <Scan className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -left-20 animate-bounce [animation-delay:1000ms]">
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <FileWarning className="h-5 w-5 text-yellow-500" />
                    </div>
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
