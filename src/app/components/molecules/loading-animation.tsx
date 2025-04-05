"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Shield,
  ShieldAlert,
  Wifi,
  Search,
  Database,
  FileCheck,
} from "lucide-react";

interface LoadingAnimationProps {
  phase: string;
}

export function LoadingAnimation({ phase }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when phase changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
    setProgress(0);
  }, [phase]);

  // Animate progress for current phase
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [animationKey]);

  const getPhaseIcon = () => {
    if (phase.includes("Initializing")) {
      return <Wifi className="h-10 w-10 text-primary" />;
    } else if (phase.includes("Crawling")) {
      return <Search className="h-10 w-10 text-primary" />;
    } else if (phase.includes("Analyzing")) {
      return <ShieldAlert className="h-10 w-10 text-primary" />;
    } else if (phase.includes("Running")) {
      return <Database className="h-10 w-10 text-primary" />;
    } else if (phase.includes("Processing")) {
      return <FileCheck className="h-10 w-10 text-primary" />;
    } else {
      return <Shield className="h-10 w-10 text-primary" />;
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Loader2 className="h-16 w-16 text-primary opacity-75" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={pulseVariants}
          animate="pulse"
        >
          <div className="h-20 w-20 rounded-full bg-primary/10" />
        </motion.div>

        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {getPhaseIcon()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.h3 className="text-xl font-medium" variants={itemVariants}>
        Scanning in progress
      </motion.h3>

      <motion.div
        className="mt-2 flex h-8 items-center justify-center"
        variants={itemVariants}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="text-center text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {phase}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-4 h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-muted"
        variants={itemVariants}
      >
        <motion.div
          className="h-2.5 rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div
        className="mt-8 grid w-full max-w-md grid-cols-4 gap-4"
        variants={itemVariants}
      >
        {["Initializing", "Crawling", "Scanning", "Processing"].map(
          (step, index) => {
            const isActive =
              phase.includes(step) ||
              (step === "Crawling" && phase.includes("Analyzing")) ||
              (step === "Scanning" && phase.includes("Running"));
            const isPast =
              (step === "Initializing" && !phase.includes("Initializing")) ||
              (step === "Crawling" &&
                (phase.includes("Running") || phase.includes("Processing"))) ||
              (step === "Scanning" && phase.includes("Processing"));

            return (
              <motion.div
                key={step}
                className="flex flex-col items-center"
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: isActive || isPast ? 1 : 0.5,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isPast
                      ? "bg-primary text-primary-foreground"
                      : isActive
                        ? "border-2 border-primary text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                  }}
                >
                  {isPast ? (
                    index + 1
                  ) : isActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span
                  className={`mt-1 text-xs ${isActive ? "font-medium text-primary" : isPast ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {step}
                </span>
              </motion.div>
            );
          },
        )}
      </motion.div>
    </motion.div>
  );
}
