"use client";

import { Zap, Workflow, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const features = [
  {
    name: "Intelligent Automation",
    description:
      "AI analyzes email requirements to instantly generate PDF & web proposals. No manual copying or formatting required.",
    icon: Zap,
  },
  {
    name: "Seamless Integration",
    description:
      "Works with your favorite tools: Gmail, Outlook, HubSpot, and Docusign. Start using in minutes, not weeks.",
    icon: Workflow,
  },
  {
    name: "Client Collaboration",
    description:
      "Streamline feedback and approvals with built-in collaboration features. Keep everyone aligned in one place.",
    icon: Users,
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-slate-50 px-6 py-12 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm lg:text-base font-semibold leading-7 text-primary">
            Everything you need
          </h2>
          <p className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Powerful Features for Modern Teams
          </p>
          <p className="mt-4 lg:mt-6 text-base lg:text-lg leading-7 lg:leading-8 text-slate-600">
            Built for speed, designed for results. Every feature focused on
            getting you from request to proposal in record time.
          </p>
        </div>

        <div className="mx-auto mt-8 lg:mt-16 grid max-w-5xl grid-cols-1 gap-5 lg:gap-8 sm:mt-20 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg bg-primary">
                  <feature.icon
                    className="h-5 w-5 lg:h-6 lg:w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 lg:mt-6 text-lg lg:text-xl font-semibold text-slate-900">
                  {feature.name}
                </h3>
                <p className="mt-2 lg:mt-4 text-sm lg:text-base leading-6 lg:leading-7 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
