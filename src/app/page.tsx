"use client"

import { Suspense } from "react"
import { ScannerTemplate } from "@/components/templates/scanner-template"
import { LoadingSpinner } from "@/components/atoms/loading-spinner"

interface Vulnerability {
  name: string
  risk: "High" | "Medium" | "Low"
  description: string
  location: string
  cweid: string
  remedy: string
  evidence?: string
  impact: string
  references: string[]
}

type ScanStatus = "idle" | "scanning" | "complete" | "error"

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ScannerTemplate />
    </Suspense>
  )
}

