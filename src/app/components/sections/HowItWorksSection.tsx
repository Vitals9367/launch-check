import SecurityReportSection from "./SecurityReport";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-gray-50 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Simple Security Scanning
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Get actionable security insights without needing a security
            background
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                  1
                </div>
              </div>
              <div className="absolute left-full top-8 hidden h-0.5 w-full bg-red-100 md:block"></div>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Enter Your URL</h3>
            <p className="text-gray-600">
              Simply enter your website or application URL to start the security
              scan.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                  2
                </div>
              </div>
              <div className="absolute left-full top-8 hidden h-0.5 w-full bg-red-100 md:block"></div>
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              Automated Security Scan
            </h3>
            <p className="text-gray-600">
              The tool checks for OWASP Top 10 vulnerabilities and other
              security issues.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                3
              </div>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Get Security Report</h3>
            <p className="text-gray-600">
              Review your security report with clear steps to fix each
              vulnerability found.
            </p>
          </div>
        </div>
        <SecurityReportSection />
      </div>
    </section>
  );
}
