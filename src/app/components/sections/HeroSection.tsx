import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { HeroGraphic } from "./HeroGraphic";

export function HeroSection() {
  return (
    <section className="scroll-disabled relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8 py-16 md:py-24 lg:py-32">
            <div className="inline-flex items-center rounded-full bg-red-100/80 px-2.5 py-1.5 text-[13px] text-red-700 backdrop-blur-sm sm:px-3 sm:text-sm">
              <Shield className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">
                For Solo Developers & Small Teams
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Ship Fast Without Getting Hacked
            </h1>
            <p className="max-w-lg text-xl text-gray-600">
              Automated security checks that run 24/7—so you can ship features
              fast without worrying about hidden vulnerabilities.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#waitlist">
                <Button className="h-12 w-full bg-red-600 px-8 text-base font-medium text-white hover:bg-red-700 sm:w-auto">
                  Get Early Access →
                </Button>
              </Link>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <HeroGraphic />
    </section>
  );
}
