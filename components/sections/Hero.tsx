"use client";

import { ArrowRight, Clock, TrendingUp, Users, ShieldCheck, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

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
      className="relative isolate overflow-hidden bg-white min-h-screen flex items-center px-6 py-8 lg:px-8"
    >
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Mobile-only readability overlay */}
      <div className="absolute inset-0 -z-[5] bg-white/40 lg:hidden pointer-events-none backdrop-blur-[1px]" />

      <div className="mx-auto max-w-7xl w-full pt-8 lg:pt-20">
        {/* Two-column hero layout */}
        <div className="flex flex-col items-center text-center">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl max-w-3xl">
              Create Winning Proposals{" "}
              <span className="text-primary">in Seconds</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 lg:mt-6 text-base leading-6 lg:text-xl lg:leading-8 text-slate-600 max-w-2xl px-2"
          >
            Automate the creation of professional fee proposals. Save 80% of
            your time and increase win rates by 40%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 lg:mt-8 flex items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToContact}
              className="group text-sm lg:text-lg"
            >
              Generate Proposal Now
              <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-6 lg:mt-12 max-w-7xl"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              {
                icon: Clock,
                title: "Save 80% Time",
                desc: "Reduce proposal creation time from hours to minutes",
              },
              {
                icon: TrendingUp,
                title: "Increase Win Rate",
                desc: "Professional, consistent proposals that convert better",
              },
              {
                icon: Users,
                title: "Team Efficiency",
                desc: "Automated workflows free up your team for high-value work",
              },
              {
                icon: ShieldCheck,
                title: "Never Miss Follow-ups",
                desc: "Automated reminders and tracking ensure no opportunities slip through",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center rounded-xl lg:rounded-2xl border border-slate-200 bg-white p-3 lg:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
              >
                <div className="mb-2 lg:mb-4 flex h-8 w-8 lg:h-14 lg:w-14 items-center justify-center rounded-lg lg:rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-4 w-4 lg:h-7 lg:w-7 text-primary" />
                </div>
                <h3 className="text-xs lg:text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                <p className="mt-1 lg:mt-2 text-[10px] lg:text-base leading-tight lg:leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
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
