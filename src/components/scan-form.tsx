"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Scan, ArrowRight, X } from "lucide-react";
import { StatusIndicator } from "@/components/status-indicator";
import type { ScanStatus } from "@/types/scanner";

interface ScanFormProps {
  onScan: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  status: ScanStatus;
  scanningPhase: string;
  defaultCrawl?: boolean;
  compact?: boolean;
}

export function ScanForm({
  onScan,
  onCancel,
  status,
  scanningPhase,
  defaultCrawl = true,
  compact = false,
}: ScanFormProps) {
  const isScanning = status === "scanning";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card>
        {!compact && (
          <CardHeader>
            <CardTitle>Start a New Scan</CardTitle>
            <CardDescription>
              Enter a website URL to scan for security vulnerabilities
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className={compact ? "pt-4" : ""}>
          <form
            action={isScanning ? undefined : onScan}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="text"
                name="url"
                placeholder="https://example.com"
                disabled={isScanning}
                className="flex-grow"
                required
              />
              <motion.div
                whileHover={{ scale: isScanning ? 1 : 1.05 }}
                whileTap={{ scale: isScanning ? 0.95 : 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {isScanning ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onCancel}
                    className="group whitespace-nowrap"
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 0 }}
                    >
                      <X className="mr-2 h-4 w-4" />
                    </motion.div>
                    Cancel Scan
                  </Button>
                ) : (
                  <Button type="submit" className="group whitespace-nowrap">
                    <motion.div
                      className="flex items-center"
                      animate={isHovered ? { x: [0, 5, 0] } : {}}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Scan className="mr-2 h-4 w-4" />
                      <span>Scan Website</span>
                      <motion.div
                        animate={isHovered ? { x: [0, 4, 0] } : {}}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.2,
                        }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      </motion.div>
                    </motion.div>
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Crawling Option - only show in full mode */}
            {!compact && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="crawl-mode"
                  name="crawl"
                  defaultChecked={defaultCrawl}
                  disabled={isScanning}
                />
                <Label htmlFor="crawl-mode">
                  Enable site crawling (more thorough but slower)
                </Label>
              </div>
            )}

            {/* Status Display - only show when scanning */}
            {isScanning && (
              <StatusIndicator status={status} scanningPhase={scanningPhase} />
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
