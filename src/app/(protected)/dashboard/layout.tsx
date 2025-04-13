import type React from "react";
import DashboardLayout from "@/components/layout/dashboard-layout/layout";
import { FeedbackWidget } from "@/components/molecules/feedback-widget";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <FeedbackWidget />
    </DashboardLayout>
  );
}
