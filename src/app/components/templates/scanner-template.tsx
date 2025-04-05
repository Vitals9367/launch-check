"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanForm } from "@/components/organisms/scan-form";
import { ResultsSection } from "@/components/organisms/results-section";
import { PageHeader } from "@/components/molecules/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { scanWebsite } from "@/actions/scan-actions";
import { LoadingAnimation } from "@/components/molecules/loading-animation";
import type {
  ScanStatus,
  Vulnerability,
  SecurityRating,
} from "@/app/types/scanner";
import { Rocket } from "lucide-react";

export function ScannerTemplate() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [enableCrawling, setEnableCrawling] = useState(true);
  const [reportId, setReportId] = useState<string | null>(null);
  const [scanningPhase, setScanningPhase] = useState<string>("");
  const [securityRating, setSecurityRating] = useState<SecurityRating | null>(
    null,
  );

  // Use refs to track and cancel ongoing scans
  const isScanCancelled = useRef(false);
  const scanTimeouts = useRef<number[]>([]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      scanTimeouts.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
    };
  }, []);

  const calculateSecurityRating = (
    vulnerabilities: Vulnerability[],
  ): SecurityRating => {
    if (vulnerabilities.length === 0) {
      return {
        score: "A+",
        label: "Excellent",
        description: "No vulnerabilities detected",
      };
    }

    // Count vulnerabilities by risk level
    const highCount = vulnerabilities.filter((v) => v.risk === "High").length;
    const mediumCount = vulnerabilities.filter(
      (v) => v.risk === "Medium",
    ).length;
    const lowCount = vulnerabilities.filter((v) => v.risk === "Low").length;

    // Calculate weighted score (high=5, medium=3, low=1)
    const weightedScore = highCount * 5 + mediumCount * 3 + lowCount * 1;

    // Determine rating based on weighted score
    if (highCount >= 2) {
      return {
        score: "F",
        label: "Critical",
        description:
          "Critical security issues detected that require immediate attention",
      };
    } else if (highCount === 1) {
      return {
        score: "D",
        label: "Poor",
        description: "Serious security vulnerabilities detected",
      };
    } else if (mediumCount >= 3) {
      return {
        score: "C",
        label: "Fair",
        description: "Multiple security issues that should be addressed",
      };
    } else if (mediumCount >= 1 || lowCount >= 3) {
      return {
        score: "B",
        label: "Good",
        description: "Minor security issues detected",
      };
    } else if (lowCount > 0) {
      return {
        score: "A",
        label: "Very Good",
        description: "Only low-risk issues detected",
      };
    }

    return {
      score: "A+",
      label: "Excellent",
      description: "No vulnerabilities detected",
    };
  };

  const handleCancelScan = () => {
    // Mark the current scan as cancelled
    isScanCancelled.current = true;

    // Clear all pending timeouts
    scanTimeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    scanTimeouts.current = [];

    // Reset the state
    setStatus("idle");
    setScanningPhase("");

    // Show cancellation message
    setErrorMessage("Scan cancelled by user");
    setStatus("error");

    // Reset cancellation flag after a short delay
    setTimeout(() => {
      isScanCancelled.current = false;
    }, 100);
  };

  const handleScan = async (formData: FormData) => {
    const url = formData.get("url") as string;
    const crawl = formData.get("crawl") === "on";

    if (!url.trim() || !url.match(/^https?:\/\/.+/)) {
      setErrorMessage(
        "Please enter a valid URL starting with http:// or https://",
      );
      setStatus("error");
      return;
    }

    try {
      // Reset cancellation flag
      isScanCancelled.current = false;

      // Clear previous timeouts
      scanTimeouts.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      scanTimeouts.current = [];

      setUrl(url);
      setEnableCrawling(crawl);
      setStatus("scanning");
      setVulnerabilities([]);
      setErrorMessage("");
      setScanningPhase("Initializing scan...");
      setReportId(null);
      setSecurityRating(null);

      // Simulate scanning phases with cancellation support
      const scanPhases = [
        "Initializing scan...",
        crawl ? "Crawling website..." : "Analyzing target...",
        "Running active scan...",
        "Processing results...",
      ];

      for (let i = 0; i < scanPhases.length; i++) {
        if (isScanCancelled.current) return;

        const phase = scanPhases[i];
        const timeoutId = window.setTimeout(() => {
          if (isScanCancelled.current) return;
          setScanningPhase(phase || "");
        }, i * 1000);

        scanTimeouts.current.push(timeoutId);
      }

      // Final timeout for completing the scan
      const finalTimeoutId = window.setTimeout(async () => {
        if (isScanCancelled.current) return;

        try {
          const result = await scanWebsite(url, crawl);

          if (isScanCancelled.current) return;

          if (result.error) {
            throw new Error(result.error);
          }

          const vulns = result.vulnerabilities || [];
          setVulnerabilities(vulns);
          setReportId(result.reportId || null);
          setSecurityRating(calculateSecurityRating(vulns));
          setStatus("complete");
        } catch (error) {
          if (isScanCancelled.current) return;

          console.error("Scan error:", error);
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
          );
          setStatus("error");
        }
      }, scanPhases.length * 1000);

      scanTimeouts.current.push(finalTimeoutId);
    } catch (error) {
      if (isScanCancelled.current) return;

      console.error("Scan error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
      setStatus("error");
    }
  };

  // Determine if we should show the centered layout or the top layout
  const showCenteredLayout = status === "idle" || status === "error";

  return (
    <div className="flex min-h-screen flex-col">
      <motion.main
        className={`container mx-auto max-w-5xl px-4 py-8 ${showCenteredLayout ? "flex flex-1 flex-col" : ""}`}
      >
        {/* Dynamic layout container */}
        <motion.div
          className={
            showCenteredLayout ? "flex flex-1 flex-col justify-center" : ""
          }
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header - only show full header in centered layout */}
          <AnimatePresence mode="wait">
            {showCenteredLayout ? (
              <motion.div
                key="full-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PageHeader />
              </motion.div>
            ) : (
              <motion.div
                key="mini-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 flex items-center"
              >
                <Rocket className="mr-2 h-5 w-5 text-primary" />
                <h2 className="text-center text-xl font-semibold sm:text-left">
                  LaunchCheck
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan Form */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ScanForm
              onScan={handleScan}
              onCancel={handleCancelScan}
              status={status}
              scanningPhase={scanningPhase}
              defaultCrawl={enableCrawling}
              compact={status === "complete"}
            />
          </motion.div>

          {/* Error Message */}
          {status === "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Loading Animation - centered in the page */}
          {status === "scanning" && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <LoadingAnimation phase={scanningPhase} />
            </motion.div>
          )}
        </motion.div>

        {/* Results Section - appears below the form when scan is complete */}
        {status === "complete" && (
          <ResultsSection
            vulnerabilities={vulnerabilities}
            reportId={reportId}
            url={url}
            enabledCrawling={enableCrawling}
            securityRating={securityRating}
          />
        )}
      </motion.main>
    </div>
  );
}
