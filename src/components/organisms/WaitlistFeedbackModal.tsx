"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import z from "node_modules/zod/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { giveFeedback } from "@/actions/feedback";
import { upperFirst } from "lodash";
import { useToast } from "@/hooks/use-toast";
import { usePostHog } from "posthog-js/react";

const feedbackSchema = z.object({
  feedback: z.string().min(1, { message: "Feedback is required" }),
});

interface WaitlistFeedbackModalProps {
  name: string;
  email: string;
  showFeedbackModal: boolean;
  setShowFeedbackModal: (showFeedbackModal: boolean) => void;
}

const WaitlistFeedbackModal = ({
  name,
  email,
  showFeedbackModal,
  setShowFeedbackModal,
}: WaitlistFeedbackModalProps) => {
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const posthog = usePostHog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
  });

  const handleFeedbackSubmission = async ({
    feedback,
  }: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    await giveFeedback({ name, email, feedback });
    toast({
      title:
        "Thank you for your feedback! We'll keep you updated on the progress.",
    });
    setIsSubmitting(false);
    setIsFeedbackSubmitted(true);
    setShowFeedbackModal(false);
    posthog.identify(email, {
      name,
    });
    posthog.capture("waitlist_feedback_submitted", {
      name,
      email,
      feedback,
    });
  };

  return (
    <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to LaunchCheck! 🚀</DialogTitle>
          <DialogDescription>
            Thanks for joining our security-first community.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {!isFeedbackSubmitted ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Hi {upperFirst(name)}, what security challenges are you facing
                with your projects? This helps to build exactly what you need!
              </p>
              <Textarea
                placeholder="Share your security concerns or what you're looking for in a security tool..."
                className="h-24"
                {...register("feedback")}
              />
              <Button
                onClick={handleSubmit(handleFeedbackSubmission)}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Share Feedback"}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Thanks for your feedback! We'll keep you updated on the
                progress.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistFeedbackModal;
