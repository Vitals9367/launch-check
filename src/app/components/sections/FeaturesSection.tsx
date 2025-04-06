import {
  Shield,
  Zap,
  Code2,
  DollarSign,
  Clock,
  Wrench,
  Bug,
  FileText,
} from "lucide-react";
import { Card } from "../ui/card";

export function FeaturesSection() {
  return (
    <section className="border-y border-gray-100 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Security That Makes Sense
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            I've simplified security scanning to focus on what matters most for
            indie hackers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 p-3 text-red-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              OWASP Top 10 Coverage
            </h3>
            <p className="text-gray-600">
              Comprehensive scanning for the most critical web application
              security risks defined by OWASP, including injection, broken
              authentication, and sensitive data exposure.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 p-3 text-orange-600">
              <Bug className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              XSS & Injection Detection
            </h3>
            <p className="text-gray-600">
              Advanced detection of cross-site scripting, SQL injection, and
              other common attack vectors that could compromise your application
              and user data.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 p-3 text-purple-600">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Actionable Reports</h3>
            <p className="text-gray-600">
              Receive clear, step-by-step remediation guides to fix each
              vulnerability found, with code examples and best practices
              tailored for indie hackers.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
