"use server";

import type { Vulnerability } from "@/types/scanner";

export async function scanWebsite(url: string, crawl: boolean) {
  try {
    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      console.error("Invalid URL format:", error);
      return { error: "Invalid URL format" };
    }

    const scanTime = crawl ? 2000 : 1000;
    await new Promise((resolve) => setTimeout(resolve, scanTime));

    // Generate a report ID
    const reportId = `zap-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;

    // Mock response - in a real implementation, this would be the result from OWASP ZAP
    let vulnerabilities: Vulnerability[] = [];

    if (url.includes("example.com")) {
      vulnerabilities = [
        {
          name: "Cross-Site Scripting (XSS)",
          risk: "High",
          description:
            "Found potential XSS vulnerability that could allow attackers to inject malicious scripts.",
          location: "/search?q=<script>alert(1)</script>",
          cweid: "CWE-79",
          remedy:
            "Implement proper input validation and output encoding. Use frameworks that automatically escape XSS by design, such as React, Angular, or Vue. Consider implementing a Content Security Policy (CSP).",
          evidence: "<script>alert(1)</script>",
          impact:
            "Attackers can execute arbitrary JavaScript in a user's browser, potentially stealing cookies, session tokens or other sensitive information, or perform actions impersonating the user.",
          references: [
            "https://owasp.org/www-community/attacks/xss/",
            "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
          ],
        },
        {
          name: "Missing Content Security Policy",
          risk: "Medium",
          description:
            "The website does not implement a Content Security Policy header, which helps prevent various attacks including XSS.",
          location: "HTTP Response Headers",
          cweid: "CWE-693",
          remedy:
            "Implement a Content Security Policy header to restrict which resources can be loaded. Start with a policy that matches your site's requirements and gradually tighten it. For example: Content-Security-Policy: default-src 'self'; script-src 'self' trusted-cdn.com",
          impact:
            "Without CSP, browsers have no way to distinguish between legitimate and malicious content sources, making the site more vulnerable to content injection attacks.",
          references: [
            "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
            "https://content-security-policy.com/",
          ],
        },
      ];

      // Add more detailed vulnerabilities if crawling is enabled
      if (crawl) {
        vulnerabilities.push({
          name: "Insecure Cookie Configuration",
          risk: "Medium",
          description:
            "Cookies are set without secure flags, potentially exposing session data.",
          location: "Set-Cookie: sessionid=abc123; path=/",
          cweid: "CWE-614",
          remedy:
            "Set the 'Secure' and 'HttpOnly' flags on all cookies containing sensitive information. For the 'Secure' flag, ensure cookies are only sent over HTTPS connections. For 'HttpOnly', prevent JavaScript from accessing cookies, mitigating XSS attacks.",
          evidence: "Set-Cookie: sessionid=abc123; path=/",
          impact:
            "Cookies without the Secure flag can be transmitted over unencrypted connections, potentially exposing sensitive information. Cookies without the HttpOnly flag can be accessed via JavaScript, making them vulnerable to XSS attacks.",
          references: [
            "https://owasp.org/www-community/controls/SecureCookieAttribute",
            "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookie-management",
          ],
        });
      }
    } else if (url.includes("test")) {
      vulnerabilities = [
        {
          name: "SQL Injection",
          risk: "High",
          description:
            "SQL injection vulnerability that could allow attackers to manipulate database queries.",
          location: "/users?id=1' OR '1'='1",
          cweid: "CWE-89",
          remedy:
            "Use parameterized queries or prepared statements instead of concatenating user input into SQL queries. Implement an ORM (Object-Relational Mapping) framework that handles SQL escaping automatically. Apply the principle of least privilege to database accounts.",
          evidence:
            "ERROR: unterminated quoted string at or near \"'\" LINE 1: SELECT * FROM users WHERE id = '1' OR '1'='",
          impact:
            "Attackers can bypass authentication, extract sensitive data, modify database contents, or even execute administrative operations on the database server.",
          references: [
            "https://owasp.org/www-community/attacks/SQL_Injection",
            "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
          ],
        },
        {
          name: "Insecure Cookie",
          risk: "Medium",
          description:
            "Cookies set without secure and HttpOnly flags expose sensitive information.",
          location: "Set-Cookie: auth=token123; path=/",
          cweid: "CWE-614",
          remedy:
            "Set both 'Secure' and 'HttpOnly' flags on all cookies containing sensitive information. For example: Set-Cookie: auth=token123; path=/; Secure; HttpOnly",
          evidence: "Set-Cookie: auth=token123; path=/",
          impact:
            "Cookies without the Secure flag can be transmitted over unencrypted connections, potentially exposing sensitive information. Cookies without the HttpOnly flag can be accessed via JavaScript, making them vulnerable to XSS attacks.",
          references: [
            "https://owasp.org/www-community/controls/SecureCookieAttribute",
            "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#secure-attribute",
          ],
        },
        {
          name: "Information Disclosure",
          risk: "Low",
          description:
            "Server version exposed in HTTP headers, providing information to potential attackers.",
          location: "HTTP Response Headers",
          cweid: "CWE-200",
          remedy:
            "Configure your web server to suppress or customize headers that reveal version information. For Apache, use the ServerTokens and ServerSignature directives. For Nginx, set server_tokens off;",
          evidence: "Server: Apache/2.4.41 (Ubuntu)",
          impact:
            "Attackers can use server version information to identify specific vulnerabilities associated with that version and target their attacks accordingly.",
          references: [
            "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
            "https://www.acunetix.com/vulnerabilities/web/server-version-disclosure/",
          ],
        },
      ];

      // Add more detailed vulnerabilities if crawling is enabled
      if (crawl) {
        vulnerabilities.push({
          name: "Cross-Site Request Forgery (CSRF)",
          risk: "Medium",
          description:
            "No CSRF tokens were found in form submissions, making the site vulnerable to CSRF attacks.",
          location: "/account/settings",
          cweid: "CWE-352",
          remedy:
            "Implement anti-CSRF tokens in all forms and verify them on the server. Use the SameSite cookie attribute to prevent CSRF in modern browsers. Consider implementing the double-submit cookie pattern as an additional layer of protection.",
          evidence:
            '<form action="/account/settings" method="POST">...[No CSRF token found]...</form>',
          impact:
            "Attackers can trick authenticated users into performing actions without their knowledge or consent, such as changing account details or making transactions.",
          references: [
            "https://owasp.org/www-community/attacks/csrf",
            "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
          ],
        });
      }
    }
    // For any other URL, return empty vulnerabilities (secure site)

    return {
      vulnerabilities,
      reportId,
    };
  } catch (error) {
    console.error("Scan error:", error);
    return { error: "Failed to process scan request" };
  }
}
