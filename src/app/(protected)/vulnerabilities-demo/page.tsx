"use client";

import { Suspense } from "react";
import { ScannerTemplate } from "@/components/scanner-template";
import { LoadingSpinner } from "@/components/loading/loading-spinner";

export default function VulnerabilitiesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScannerTemplate />
    </Suspense>
  );
}
