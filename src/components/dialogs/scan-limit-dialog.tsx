import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useScanLimitDialogStore } from "@/store/use-scan-limit-dialog-store";

export function ScanLimitDialog() {
  const { isOpen, onClose } = useScanLimitDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Limit Reached</DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <p>
              You have reached the maximum number of scans allowed in the free
              tier.
            </p>
            <p>
              To continue using the service and run more scans, please reach out
              to:
            </p>
            <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 p-3 text-sm">
              <Mail className="h-4 w-4 text-gray-600" />
              <a
                href="mailto:vitalijus.alsauskas@gmail.com"
                className="text-blue-600 hover:underline"
              >
                vitalijus.alsauskas@gmail.com
              </a>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
