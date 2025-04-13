import { env } from "@/env";

export type ContentSecurityPolicyDirective = {
  name: string;
  values: string[];
};

export type SecurityHeadersConfig = {
  contentSecurityPolicy: ContentSecurityPolicyDirective[];
  corsConfig: {
    origin: string;
    methods: string[];
    headers: string[];
    maxAge: number;
  };
};

/**
 * Generates a nonce for CSP headers
 */
export const generateNonce = () =>
  Buffer.from(crypto.randomUUID()).toString("base64");

/**
 * Security headers configuration
 */
export const securityHeaders = (nonce: string): SecurityHeadersConfig => ({
  contentSecurityPolicy: [
    { name: "default-src", values: ["'self'"] },
    {
      name: "script-src",
      values: ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"],
    },
    { name: "style-src", values: ["'self'", `'nonce-${nonce}'`] },
    { name: "img-src", values: ["'self'", "blob:", "data:"] },
    { name: "font-src", values: ["'self'"] },
    { name: "object-src", values: ["'none'"] },
    { name: "base-uri", values: ["'self'"] },
    { name: "form-action", values: ["'self'"] },
    { name: "frame-ancestors", values: ["'none'"] },
    { name: "connect-src", values: ["'self'", "https://*.posthog.com"] },
  ],
  corsConfig: {
    origin: env.NEXT_PUBLIC_SITE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    headers: ["Content-Type", "Authorization"],
    maxAge: 86400, // 24 hours
  },
});

/**
 * Builds the CSP header string from directives
 */
export const buildCspHeader = (
  directives: ContentSecurityPolicyDirective[],
): string => {
  return directives
    .map(({ name, values }) => `${name} ${values.join(" ")};`)
    .join(" ")
    .concat(" upgrade-insecure-requests;")
    .trim();
};
