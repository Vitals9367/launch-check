"use client";

import { Shield, Zap, Bell, Code2, FileText, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const steps = [
  {
    icon: Coffee,
    title: "You Build Amazing Things",
    description:
      "While you focus on creating awesome features and shipping products, we handle the security checks in the background",
  },
  {
    icon: Shield,
    title: "We Find Issues (If Any)",
    description:
      "We scan your website and notify you only when something needs attention - no constant alerts or false alarms",
  },
  {
    icon: Code2,
    title: "Get Simple Solutions",
    description:
      "Receive clear explanations and ready-to-use code snippets that you can quickly implement and get back to building",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-12 text-white md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Ship Fast. Stay Secure.
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-300">
            Focus on building your next big thing. We'll handle the security
            checks.
          </p>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="mx-auto mb-20 max-w-3xl rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm"
        >
          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                variants={fadeIn}
                className="relative mb-12 pl-16 last:mb-0"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10"
                >
                  <step.icon className="h-6 w-6 text-red-500" />
                </motion.div>
                <h4 className="mb-2 text-xl font-semibold">{step.title}</h4>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-500">24/7</div>
              <h3 className="text-xl font-semibold">Continuous Protection</h3>
              <p className="text-sm text-gray-300">
                We monitor your site while you sleep, code, or enjoy your coffee
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-500">5 min</div>
              <h3 className="text-xl font-semibold">Quick Fixes</h3>
              <p className="text-sm text-gray-300">
                Copy-paste solutions with code snippets that just work
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-500">No</div>
              <h3 className="text-xl font-semibold">Learning Curve</h3>
              <p className="text-sm text-gray-300">
                No security expertise needed - focus on building your product
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
