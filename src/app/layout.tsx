import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "LaunchCheck | Free Website Security Scanner & Vulnerability Detection Tool",
  description:
    "Scan your website for security vulnerabilities before hackers do. Find XSS, SQL injection, and OWASP Top 10 issues before deployment. No downloads, no accounts required.",
  keywords: [
    "website security scanner",
    "web vulnerability scanner online",
    "scan website for vulnerabilities",
    "pre-launch website security check",
    "XSS vulnerability checker",
    "SQL injection scanner",
    "OWASP Top 10 scanner",
    "website security audit tool",
    "check website security before launch",
    "free security audit website",
    "website vulnerability detection",
    "automated security scanner",
  ],
  authors: [
    {
      name: "LaunchCheck Security Team",
    },
  ],
  creator: "LaunchCheck",
  publisher: "LaunchCheck",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://launchcheck.io",
    title: "LaunchCheck - Find Website Vulnerabilities Before Hackers Do",
    description:
      "Free online tool to scan websites for security vulnerabilities like XSS, SQL injection, and OWASP Top 10 issues before deployment or after launch.",
    siteName: "LaunchCheck",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LaunchCheck - Website Security Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchCheck - Website Security Scanner",
    description:
      "Scan your website for security vulnerabilities before hackers do. Free online security audit tool.",
    images: ["/twitter-image.png"],
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
