"use client";

import { ArrowRight, Clock, TrendingUp, Users, ShieldCheck, Play } from "lucide-react";
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
        {/* Two-column hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Hero Content */}
          <div className="text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                Create Winning Proposals{" "}
                <span className="text-primary">in Seconds</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl lg:text-2xl max-w-xl"
            >
              Automate the creation of professional fee proposals. Save 80% of
              your time and increase win rates by 40%.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center gap-4"
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
          </div>

          {/* RIGHT COLUMN - Video Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Video placeholder container with 16:9 aspect ratio */}
              <div className="relative aspect-video w-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-200/50 overflow-hidden transition-all duration-300 group-hover:shadow-primary/20 group-hover:border-primary/30">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Play className="h-10 w-10 text-primary" fill="currentColor" />
                  </div>
                  <p className="mt-6 text-lg font-semibold text-slate-600 text-center">
                    Product Demo Video
                  </p>
                  <p className="mt-2 text-sm text-slate-500 text-center max-w-xs">
                    See how AlfredAI transforms proposal creation
                  </p>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl -z-10" />
              <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-primary/5 blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-20 max-w-7xl"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 sm:p-12">
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Save 80% Time</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Reduce proposal creation time from hours to minutes
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Increase Win Rate</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Professional, consistent proposals that convert better
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Team Efficiency</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Automated workflows free up your team for high-value work
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Never Miss Follow-ups</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Automated reminders and tracking ensure no opportunities slip through
                </p>
              </div>
            </div>
          </div>
        </motion.div>
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
