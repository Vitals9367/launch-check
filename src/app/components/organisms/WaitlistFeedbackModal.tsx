import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

const WaitlistFeedbackModal = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to LaunchCheck! 🚀</DialogTitle>
          <DialogDescription>
            Thanks for joining our security-first community.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500" />
              <p className="ml-2 text-green-700">
                Welcome email sent to your inbox!
              </p>
            </div>
          </div>

          {/* {!isFeedbackSubmitted ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Hi {submittedName}, we'd love to know what made you interested
                in LaunchCheck. This helps us build exactly what you need!
              </p>
              <Textarea
                placeholder="What security challenges are you facing with your SaaS?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="h-24"
              />
              <Button
                onClick={handleFeedbackSubmission}
                className="w-full"
                disabled={isLoading || !feedback.trim()}
              >
                {isLoading ? "Sending..." : "Share Feedback"}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Thanks for your feedback! We'll keep you updated on our
                progress.
              </p>
            </div>
          )}
        // </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistFeedbackModal;
