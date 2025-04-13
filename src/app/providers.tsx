// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import PostHogPageView from "@/components/PostHogPageView";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import DialogManager from "@/components/ui/dialog-manager";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TRPCReactProvider>
        <PHProvider client={posthog}>
          <PostHogPageView />
          <NuqsAdapter>
            {children}
            <Toaster />
            <DialogManager />
          </NuqsAdapter>
        </PHProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
