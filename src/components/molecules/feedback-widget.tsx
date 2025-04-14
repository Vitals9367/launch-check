"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  X,
  Send,
  Loader2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { giveFeedback } from "@/actions/give-feedback";
import { useCurrentUser } from "@/hooks/use-current-user";

type FeedbackType = "positive" | "negative" | null;

type FeedbackButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

const FeedbackButton = ({ isOpen, onClick }: FeedbackButtonProps) => (
  <Button
    variant="default"
    size="icon"
    className={cn(
      "h-12 w-12 rounded-full bg-red-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-700",
      isOpen && "rotate-90 bg-red-700",
    )}
    onClick={onClick}
  >
    {isOpen ? (
      <X className="h-6 w-6 text-white" />
    ) : (
      <MessageCircle className="h-6 w-6 text-white" />
    )}
    <span className="sr-only">Toggle feedback</span>
  </Button>
);

type FeedbackTypeSelectionProps = {
  selectedType: FeedbackType;
  onSelect: (type: FeedbackType) => void;
  disabled: boolean;
};

const FeedbackTypeSelection = ({
  selectedType,
  onSelect,
  disabled,
}: FeedbackTypeSelectionProps) => (
  <div className="mb-4 flex justify-center gap-4">
    <Button
      variant={selectedType === "positive" ? "default" : "outline"}
      className={cn(
        "flex-1 border-red-200",
        selectedType === "positive" && "bg-red-600 hover:bg-red-700",
        selectedType !== "positive" && "hover:bg-red-50 hover:text-red-700",
      )}
      onClick={() => onSelect("positive")}
      disabled={disabled}
    >
      <ThumbsUp className="mr-2 h-4 w-4" />
      Good
    </Button>
    <Button
      variant={selectedType === "negative" ? "default" : "outline"}
      className={cn(
        "flex-1 border-red-200",
        selectedType === "negative" && "bg-red-600 hover:bg-red-700",
        selectedType !== "negative" && "hover:bg-red-50 hover:text-red-700",
      )}
      onClick={() => onSelect("negative")}
      disabled={disabled}
    >
      <ThumbsDown className="mr-2 h-4 w-4" />
      Bad
    </Button>
  </div>
);

type SuccessMessageProps = {
  message: string;
};

const SuccessMessage = ({ message }: SuccessMessageProps) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <ThumbsUp className="mb-4 h-8 w-8 text-red-600" />
    <p className="text-lg font-semibold text-gray-900">{message}</p>
  </div>
);

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const user = useCurrentUser();

  useEffect(() => {
    const hasShownWidget = localStorage.getItem("feedbackWidgetShown");
    if (!hasShownWidget) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("feedbackWidgetShown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async () => {
    if (!feedbackType || !message.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const result = await giveFeedback({
        name: user.name ?? "",
        email: user.email ?? "",
        feedback: `${feedbackType}: ${message.trim()}`,
      });
      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Thank you for your feedback!",
          description: "We appreciate your input.",
          className: "bg-red-50 border-red-200",
        });
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
          setFeedbackType(null);
          setMessage("");
        }, 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-8 z-50">
      <FeedbackButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <div
        className={cn(
          "absolute bottom-16 right-0 w-80 transform rounded-lg border border-gray-200 bg-white p-4 shadow-xl transition-all duration-200",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {isSubmitted ? (
          <SuccessMessage message="Thank you for your feedback!" />
        ) : (
          <>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              How's your experience?
            </h3>

            <FeedbackTypeSelection
              selectedType={feedbackType}
              onSelect={setFeedbackType}
              disabled={isSubmitting}
            />

            {feedbackType && (
              <div className="space-y-4">
                <Textarea
                  placeholder="Tell us more about your experience..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] resize-none border-red-200 focus-visible:ring-red-500"
                  disabled={isSubmitting}
                />
                <Button
                  className={cn(
                    "w-full bg-red-600 hover:bg-red-700",
                    isSubmitting && "opacity-80",
                  )}
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
