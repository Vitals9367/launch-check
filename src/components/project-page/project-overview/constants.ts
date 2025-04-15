export const SECURITY_RATINGS = {
  A: { label: "Excellent", color: "text-green-600" },
  B: { label: "Good", color: "text-green-600" },
  C: { label: "Fair", color: "text-orange-500" },
  D: { label: "Poor", color: "text-orange-500" },
  F: { label: "Critical", color: "text-red-600" },
} as const;

export const SEVERITY_ICONS = {
  critical: {
    color: "text-red-600",
    label: "Critical",
  },
  high: {
    color: "text-orange-500",
    label: "High",
  },
  medium: {
    color: "text-yellow-500",
    label: "Medium",
  },
  low: {
    color: "text-blue-500",
    label: "Low",
  },
} as const;
