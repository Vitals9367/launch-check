"use client";

import { Component, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex items-center gap-2">
                Something went wrong. Please try again later.
                <Button
                  variant="link"
                  className="pl-0 text-red-700 hover:text-red-600"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
