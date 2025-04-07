"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to scan my website?",
    answer:
      "Most scans complete within 5-10 minutes. The exact duration depends on your site's size and complexity. You can run quick scans that focus on critical vulnerabilities in under 5 minutes.",
  },
  {
    question: "Do I need to be a security expert to use this?",
    answer:
      "Not at all! The platform is designed for developers of all skill levels. You get clear, actionable steps to fix any issues found - no security expertise required.",
  },
  {
    question: "What types of security issues can it detect?",
    answer:
      "The scanner covers all major security threats including OWASP Top 10, CWE Top 25, and SANS Top 25 vulnerabilities. This includes SQL injection, XSS, authentication issues, data exposure risks, and security misconfigurations.",
  },
  {
    question: "Can I integrate this with my CI/CD pipeline?",
    answer:
      "Yes! The tool provides easy integration with popular CI/CD platforms. You can automatically run security checks after each deploy or on a schedule that works for your team.",
  },
  {
    question: "How are false positives handled?",
    answer:
      "The advanced scanning engine uses context-aware analysis to minimize false positives. You can customize scanning rules and sensitivity levels to match your needs.",
  },
  {
    question: "Is it safe to scan my production site?",
    answer:
      "Absolutely. The scanning is non-intrusive and designed to be production-safe. Built-in rate limiting and smart throttling ensure minimal impact on your site's performance.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 py-24">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Common questions about the security scanning service
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-400 transition-transform",
                    openIndex === index ? "rotate-180" : "",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0",
                )}
              >
                <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
