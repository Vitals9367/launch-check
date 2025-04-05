import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import type { ScanStatus } from "@/types/scanner"

interface StatusIndicatorProps {
  status: ScanStatus
  scanningPhase: string
}

export function StatusIndicator({ status, scanningPhase }: StatusIndicatorProps) {
  return (
    <div className="mt-2">
      <div className="text-sm font-medium mb-2">Status:</div>
      <div className="flex items-center space-x-2">
        {status === "idle" && <Badge variant="outline">Idle</Badge>}
        {status === "scanning" && (
          <>
            <Badge variant="secondary" className="flex items-center">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              Scanning...
            </Badge>
            <span className="text-sm text-muted-foreground">{scanningPhase}</span>
          </>
        )}
        {status === "complete" && (
          <Badge variant="success" className="bg-green-500 hover:bg-green-600 flex items-center">
            <CheckCircle className="mr-1 h-3 w-3" />
            Scan Complete
          </Badge>
        )}
        {status === "error" && (
          <Badge variant="destructive" className="flex items-center">
            <AlertCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )}
      </div>
    </div>
  )
}

