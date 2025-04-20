"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
