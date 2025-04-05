"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, ShieldAlert } from "lucide-react";
import { VulnerabilityCard } from "@/components/molecules/vulnerability-card";
import { SecurityRatingDisplay } from "@/components/molecules/security-rating-display";
import type { Vulnerability, SecurityRating } from "@/app/types/scanner";

interface ResultsSectionProps {
  vulnerabilities: Vulnerability[];
  reportId: string | null;
  enabledCrawling: boolean;
  securityRating: SecurityRating | null;
}

export function ResultsSection({
  vulnerabilities,
  reportId,
  enabledCrawling,
  securityRating,
}: ResultsSectionProps) {
  const downloadReport = async () => {
    if (!reportId) return;

    try {
      const response = await fetch(`/api/report/${reportId}`);

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `launchcheck-report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Security Rating Card */}
      {securityRating && (
        <SecurityRatingDisplay
          rating={securityRating}
          vulnerabilities={vulnerabilities}
        />
      )}

      {/* Results Card */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5" />
                Scan Results
              </CardTitle>
              <CardDescription>
                {vulnerabilities.length === 0
                  ? "No vulnerabilities found"
                  : `Found ${vulnerabilities.length} potential vulnerabilities`}
              </CardDescription>
            </div>

            {/* Download Report Button */}
            {reportId && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={downloadReport}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </motion.div>
            )}
          </CardHeader>
          <CardContent>
            {vulnerabilities.length === 0 ? (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </motion.div>
                <AlertTitle>All Clear</AlertTitle>
                <AlertDescription>
                  No vulnerabilities were detected in the scan.
                </AlertDescription>
              </Alert>
            ) : (
              <motion.div className="space-y-4">
                <AnimatePresence>
                  {vulnerabilities.map((vuln, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <VulnerabilityCard vulnerability={vuln} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground">
              This scan was performed using LaunchCheck security scanner.
              {enabledCrawling &&
                " The site was crawled to discover additional pages and endpoints."}
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
