import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchCheck | Security Scanner Built for Indie Hackers",
  description:
    "A security scanner built by an indie hacker for indie hackers. Find and fix vulnerabilities in your SaaS before hackers do. Simple, actionable, and built for makers.",
  keywords: [
    "indie hacker security",
    "saas security scanner",
    "micro-saas security",
    "website vulnerability scanner",
    "indie maker security tool",
    "startup security scanner",
    "OWASP Top 10 scanner",
    "website security audit",
    "indie business security",
    "bootstrap startup security",
    "website vulnerability detection",
    "indie security tool",
  ],
  authors: [
    {
      name: "Vitalijus Alsauskas",
      url: "https://x.com/alsauskas_v",
    },
  ],
  creator: "Vitalijus Alsauskas",
  publisher: "LaunchCheck",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://launchcheck.io",
    title: "LaunchCheck - Security Scanner Built for Indie Hackers",
    description:
      "Built by an indie hacker who understands your needs. Find and fix vulnerabilities in your SaaS with clear, actionable insights.",
    siteName: "LaunchCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LaunchCheck - Security Scanner for Indie Hackers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchCheck - Security Scanner for Indie Hackers",
    description:
      "Built by an indie hacker who understands your needs. Find and fix vulnerabilities in your SaaS with clear, actionable insights.",
    images: ["/og-image.png"],
    creator: "@alsauskas_v",
  },
  alternates: {
    canonical: "https://launchcheck.io",
  },
  category: "Security Tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
