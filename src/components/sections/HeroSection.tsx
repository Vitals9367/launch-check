import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { HeroGraphic } from "@/components/organisms/hero/HeroGraphic";

export function HeroSection() {
  return (
    <section className="relative min-h-[800px] w-full overflow-hidden">
      {/* Background Graphic - Positioned Absolutely */}
      <div className="absolute right-0 top-0 h-full w-[45%]">
        <HeroGraphic />
      </div>

      {/* Content Container */}
      <div className="container relative mx-auto max-w-6xl">
        <div className="relative z-10 max-w-2xl py-16 md:py-24 lg:py-32">
          <div className="inline-flex items-center rounded-full bg-red-100/80 px-2.5 py-1.5 text-[13px] text-red-700 backdrop-blur-sm sm:px-3 sm:text-sm">
            <Shield className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
            <span className="whitespace-nowrap">
              For Indie SaaS Founders & Small Teams
            </span>
          </div>
          <h1 className="mt-8 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Ship Fast Without Getting Hacked
          </h1>
          <p className="mt-8 text-xl text-gray-600">
            Get peace of mind with automated security tests that run 24/7,
            catching vulnerabilities while you focus on building your product.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#waitlist">
              <Button className="h-12 w-full bg-red-600 px-8 text-base font-medium text-white hover:bg-red-700 sm:w-auto">
                Get Early Access →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
