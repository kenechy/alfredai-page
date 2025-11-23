"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white px-6 pt-32 pb-20 lg:px-8 lg:pt-40 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Create Winning Proposals{" "}
              <span className="text-primary">in Seconds</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl"
          >
            Automate the creation of professional fee proposals. Save 80% of
            your time and increase win rates by 40%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToContact}
              className="group"
            >
              Generate Proposal Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">80%</p>
              <p className="mt-1 text-sm text-slate-600">Time Saved</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-300 sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">40%</p>
              <p className="mt-1 text-sm text-slate-600">Higher Win Rate</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-300 sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">10k+</p>
              <p className="mt-1 text-sm text-slate-600">Proposals Generated</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-primary/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
