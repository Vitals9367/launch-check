"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  DollarSign,
  Lock,
  Shield,
  Twitter,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
} from "lucide-react";

const risks = [
  {
    icon: DollarSign,
    title: "Lost Revenue",
    description:
      "A breach costs thousands in lost customers and emergency fixes.",
  },
  {
    icon: AlertTriangle,
    title: "Lost Trust",
    description: "Users rarely come back after their data is compromised.",
  },
  {
    icon: Clock,
    title: "Lost Development Time",
    description: "Security incidents derail your roadmap for weeks or months.",
  },
  {
    icon: Zap,
    title: "Service Disruption",
    description: "Your app could be taken offline, leaving users stranded.",
  },
  {
    icon: Lock,
    title: "Legal Risk",
    description: "You're personally responsible for data breaches.",
  },
];

const socialProof = [
  {
    image: "/tweet.png",
    link: "https://x.com/leojr94_/status/1901560276488511759",
    alt: "Tweet showing real consequences of security oversight",
  },
  {
    image: "/tweet2.png",
    link: "https://x.com/example2",
    alt: "Another developer sharing their security incident",
  },
  {
    image: "/tweet3.png",
    link: "https://x.com/example3",
    alt: "Security breach impact story",
  },
];

export function SecurityRisksSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % socialProof.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + socialProof.length) % socialProof.length,
    );
  };

  return (
    <section className="border-b border-gray-100 bg-gray-50 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full bg-red-100 px-4 py-1">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Real Stories
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Security Problems Are Expensive
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Don't wait until it's too late. Here's what happens when security
            isn't a priority.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-7">
          {/* Social Proof Carousel */}
          <div className="relative px-16 md:col-span-4">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-all hover:bg-red-50 hover:text-red-600"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-all hover:bg-red-50 hover:text-red-600"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative h-[500px] overflow-hidden rounded-xl bg-black shadow-lg">
              {socialProof.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                  style={{
                    transform: `translateX(${(index - currentSlide) * 100}%)`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center justify-end text-sm text-white">
                      <X className="mr-2 h-4 w-4" />
                      <span>View on X</span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {socialProof.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentSlide ? "w-4 bg-white" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Risks */}
          <div className="grid grid-cols-1 content-start gap-6 md:col-span-3">
            {risks.map((risk, index) => {
              const Icon = risk.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                    <Icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {risk.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{risk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
