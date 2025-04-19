import { CheckCircle, AlertTriangle } from "lucide-react";
import type { ScanStatus, StatusDetails } from "./types";

export function getStatusConfig(status: ScanStatus): StatusDetails {
  switch (status) {
    case "secure":
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: "Secure",
        color: "text-green-700 bg-green-50",
        variant: "default",
      };
    case "warning":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        text: "Warning",
        color: "text-yellow-700 bg-yellow-50",
        variant: "secondary",
      };
    case "vulnerable":
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        text: "Vulnerable",
        color: "text-red-700 bg-red-50",
        variant: "destructive",
      };
  }
}
