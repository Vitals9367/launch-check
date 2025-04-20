import type React from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout/layout";
import { FeedbackWidget } from "@/components/layouts/dashboard-layout/feedback-widget";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <FeedbackWidget />
    </DashboardLayout>
  );
}
