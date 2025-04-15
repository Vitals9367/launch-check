import {
  AlertTriangle,
  DollarSign,
  Lock,
  Shield,
  Clock,
  Zap,
} from "lucide-react";
import { SecurityRisksCarousel } from "./security-risks-carousel-section";

const risks = [
  {
    icon: DollarSign,
    title: "Lost Revenue",
    description:
      "A breach costs thousands in lost customers and emergency fixes.",
  },
  {
    icon: AlertTriangle,
    title: "Lost Trust",
    description: "Users rarely come back after their data is compromised.",
  },
  {
    icon: Clock,
    title: "Lost Development Time",
    description: "Security incidents derail your roadmap for weeks or months.",
  },
  {
    icon: Zap,
    title: "Service Disruption",
    description: "Your app could be taken offline, leaving users stranded.",
  },
  {
    icon: Lock,
    title: "Legal Risk",
    description: "You're personally responsible for data breaches.",
  },
];

export function SecurityRisksSection() {
  return (
    <section className="border-b border-gray-100 bg-gray-50 py-12 pb-20 md:py-20 md:pb-32">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex max-w-fit items-center rounded-full bg-red-100 px-4 py-1">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              Real Stories
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Security Problems Are Expensive
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Don't wait until it's too late. Here's what happens when security
            isn't a priority.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-7">
          {/* Social Proof Carousel */}
          <div className="md:col-span-4">
            <SecurityRisksCarousel />
          </div>

          {/* Risks */}
          <div className="grid grid-cols-1 content-start gap-6 md:col-span-3">
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
        </div>
      </div>
    </section>
  );
}
