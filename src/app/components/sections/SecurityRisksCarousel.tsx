"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, TouchEvent } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const socialProof = [
  {
    image: "/tweet.png",
    link: "https://x.com/leojr94_/status/1901560276488511759",
    alt: "Leo getting hacked",
  },
  {
    image: "/tweet-2.jpg",
    link: "https://x.com/hackSultan/status/1902416056301306248/photo/2",
    alt: "Jack Friks getting hacked",
  },
  {
    image: "/tweet-3.png",
    link: "https://x.com/tech_nurgaliyev/status/1908776130158395897",
    alt: "Sabyr getting hacked",
  },
];

export function SecurityRisksCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % socialProof.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + socialProof.length) % socialProof.length,
    );
  }, []);

  // Minimum swipe distance in pixels
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    if (!touch) return;

    setTouchEnd(null);
    setTouchStart(touch.clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    if (!touch) return;

    setTouchEnd(touch.clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 3000);
      return () => clearInterval(timer);
    }
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative sm:px-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-all hover:bg-red-50 hover:text-red-600 sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-gray-800 shadow-lg transition-all hover:bg-red-50 hover:text-red-600 sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="relative h-[500px] overflow-hidden rounded-xl bg-black shadow-lg"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {socialProof.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
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
  );
}
