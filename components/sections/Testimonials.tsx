"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    content:
      "AlfredAI has transformed our proposal process. What used to take hours now takes minutes. Our win rate has increased significantly since we started using it.",
    author: "Sarah Chen",
    role: "Director of Sales",
    company: "TechVentures Inc",
    initials: "SC",
    color: "bg-primary",
  },
  {
    content:
      "The integration with our existing tools was seamless. The AI-generated proposals are professional and accurate. It's become an essential part of our workflow.",
    author: "Michael Rodriguez",
    role: "VP of Business Development",
    company: "Global Consulting Group",
    initials: "MR",
    color: "bg-slate-600",
  },
  {
    content:
      "We've seen an 80% reduction in proposal creation time. The ROI was immediate. Our team can now focus on high-value activities instead of repetitive document formatting.",
    author: "Emily Thompson",
    role: "Chief Operating Officer",
    company: "Innovation Partners",
    initials: "ET",
    color: "bg-primary/90",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by Leading Companies
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            See what our customers have to say about transforming their proposal
            process.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <blockquote className="text-base leading-7 text-slate-700">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${testimonial.color} text-white font-semibold`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-slate-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
