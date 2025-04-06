import Image from "next/image";
import { AlertTriangle, DollarSign, Lock, Shield } from "lucide-react";

const risks = [
  {
    icon: DollarSign,
    title: "Lost Revenue & Recovery Costs",
    description:
      "Even for small projects, a security breach can cost thousands in lost subscriptions, emergency fixes, and recovery efforts - money that could've been spent on growth.",
  },
  {
    icon: AlertTriangle,
    title: "Trust is Hard to Rebuild",
    description:
      "When your users' data is compromised, they don't care if you're a solo dev or a big company. Most users never return after a breach, killing your project's momentum.",
  },
  {
    icon: Lock,
    title: "Personal Liability",
    description:
      "As a solo developer or small team, you're personally responsible for data breaches. GDPR fines start at €10 million - way more than most indie projects can handle.",
  },
];

export function SecurityRisksSection() {
  return (
    <section className="border-b border-gray-100 bg-gray-50 px-4 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full bg-red-100 px-4 py-1">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Real Stories from Indie Devs
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            When Security Takes a Backseat
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            As a solo dev or small team, it's tempting to push security to
            "later". But in today's landscape, a single vulnerability can
            destroy your project overnight.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Tweet Image */}
          <div className="relative flex items-center justify-center rounded-xl p-6">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-black shadow-sm">
              <Image
                src="/tweet.png"
                alt="Tweet showing real consequences of security oversight"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>

          {/* Risks and Stats */}
          <div className="space-y-8">
            <div className="space-y-6">
              {risks.map((risk, index) => {
                const Icon = risk.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {risk.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{risk.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <h4 className="mb-2 text-lg font-semibold text-red-900">
                Why You Need Continuous Scanning
              </h4>
              <p className="text-red-800">
                When you're focused on building features, security
                vulnerabilities can slip through:
              </p>
              <ul className="mt-2 space-y-1 text-red-800">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  New threats emerge in dependencies you already use
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Quick fixes can accidentally create security holes
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Common patterns you use might have unknown vulnerabilities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
