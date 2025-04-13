"use client"

import { Suspense } from "react"
import { ScannerTemplate } from "@/components/templates/scanner-template"
import { LoadingSpinner } from "@/components/atoms/loading-spinner"

export default function VulnerabilitiesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScannerTemplate />
    </Suspense>
  )
}

