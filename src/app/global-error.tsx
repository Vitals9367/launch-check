"use client";

import * as Sentry from "@sentry/nextjs";
import type Error from "next/error";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <main className="container mx-auto flex max-w-5xl flex-1 flex-col justify-center px-4 py-8">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="mb-8 flex flex-col items-center">
                <h1 className="mb-3 text-4xl font-bold text-foreground">
                  Oops!
                </h1>
                <h2 className="mb-2 text-2xl font-semibold text-foreground">
                  Something went seriously wrong
                </h2>
                <p className="max-w-[600px] text-muted-foreground">
                  We've encountered a critical error. Our team has been notified
                  and is working to fix it.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button onClick={() => reset()} className="gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
