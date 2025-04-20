export type ScanStatus = "idle" | "scanning" | "complete" | "error"

export interface Vulnerability {
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

export interface SecurityRating {
  score: "A+" | "A" | "B" | "C" | "D" | "F"
  label: string
  description: string
}

