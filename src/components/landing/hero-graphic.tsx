"use client";

import { useState, useRef, useEffect } from "react";
import {
  Shield,
  Lock,
  AlertTriangle,
  Bug,
  Key,
  Scan,
  FileWarning,
} from "lucide-react";

// Data for floating elements
const floatingElementsData = [
  {
    id: 1,
    icon: Lock,
    classes: "-right-24 -top-28",
    color: "text-green-500",
  },
  {
    id: 2,
    icon: AlertTriangle,
    classes: "-bottom-32 -left-20",
    color: "text-red-500",
  },
  {
    id: 3,
    icon: Bug,
    classes: "-left-32 top-8",
    color: "text-orange-500",
  },
  {
    id: 4,
    icon: Key,
    classes: "-top-24 right-28",
    color: "text-blue-500",
  },
  {
    id: 5,
    icon: Scan,
    classes: "-bottom-6 -right-32",
    color: "text-purple-500",
  },
  {
    id: 6,
    icon: FileWarning,
    classes: "-bottom-16 -left-28",
    color: "text-yellow-500",
  },
];

export function HeroGraphic() {
  const [isPulsing, setIsPulsing] = useState(false);
  const pulseTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerPulse = () => {
    setIsPulsing(true);

    if (pulseTimeout.current) {
      clearTimeout(pulseTimeout.current);
    }

    pulseTimeout.current = setTimeout(() => {
      setIsPulsing(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (pulseTimeout.current) {
        clearTimeout(pulseTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative hidden h-full w-full items-center justify-start pl-56 lg:flex">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-60"></div>
      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-red-100/50 blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-orange-100/50 blur-2xl"></div>

      {/* Main Security Shield Area */}
      <div className="relative flex h-full w-full items-center">
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
          <div
            onMouseEnter={triggerPulse}
            onClick={triggerPulse}
            className="relative h-24 w-24 cursor-pointer rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105 lg:h-32 lg:w-32 lg:p-8"
          >
            {/* Hover Pulse Effect */}
            <div
              className={`absolute -inset-2 rounded-full border-2 border-red-500 ${isPulsing ? "animate-ping opacity-75" : "opacity-0"}`}
              style={{ animationDuration: "1s" }}
            ></div>
            <Shield className="relative z-10 h-full w-full text-red-600" />
          </div>

          {/* Floating Security Elements */}
          {floatingElementsData.map((el) => (
            <div
              key={el.id}
              className={`absolute ${el.classes} animate-bounce`}
              style={{
                animationDuration: "6s",
                animationDelay: `${el.id * 250}ms`,
              }}
            >
              <div className="rounded-lg bg-white p-2 shadow-md lg:p-3">
                <el.icon className={`h-5 w-5 ${el.color} lg:h-6 lg:w-6`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
