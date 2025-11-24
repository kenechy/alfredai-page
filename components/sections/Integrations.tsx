"use client";

import Image from "next/image";

export function Integrations() {
  const integrations = [
    { name: "Gmail", category: "Email", logo: "/tools/gmail.png" },
    { name: "HubSpot", category: "CRM", logo: "/tools/hubspot.png" },
    { name: "Outlook", category: "Email", logo: "/tools/outlook.png" },
    { name: "Slack", category: "Communication", logo: "/tools/slack.png" },
    { name: "Dropbox", category: "Storage", logo: "/tools/dropbox.png" },
    { name: "Google Drive", category: "Storage", logo: "/tools/drive.png" },
    { name: "GoHighLevel", category: "CRM", logo: "/tools/ghl.png" },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Seamlessly Integrates With Your Existing Tools
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Connect with the tools you already use every day
          </p>
        </div>

        {/* Marquee Container */}
        <div className="group relative mt-12 overflow-hidden">
          {/* Gradient overlays for fade effect - wider and smoother */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-40"></div>
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-40"></div>

          {/* Marquee Track - proper wrapper for seamless loop */}
          <div className="flex">
            <div className="flex animate-marquee items-center">
              {/* First set of logos (doubled for wide screens) */}
              {[...integrations, ...integrations].map((integration, index) => {
                const needsScaling = ["HubSpot", "GoHighLevel", "Slack"].includes(
                  integration.name
                );
                return (
                  <div
                    key={`first-${index}`}
                    className="flex min-w-[100px] flex-shrink-0 items-center justify-center px-4 sm:min-w-[160px] sm:px-8"
                  >
                    <div className="relative h-12 w-12 sm:h-20 sm:w-20">
                      <Image
                        src={integration.logo}
                        alt={`${integration.name} logo`}
                        fill
                        className={`object-contain ${needsScaling ? "scale-125" : ""}`}
                        sizes="(max-width: 640px) 48px, 80px"
                      />
                    </div>
                  </div>
                );
              })}
              {/* Duplicate set for seamless loop */}
              {[...integrations, ...integrations].map((integration, index) => {
                const needsScaling = ["HubSpot", "GoHighLevel", "Slack"].includes(
                  integration.name
                );
                return (
                  <div
                    className="flex min-w-[100px] flex-shrink-0 items-center justify-center px-8 sm:min-w-[160px] sm:px-16"
                  >
                    <div className="relative h-12 w-12 sm:h-20 sm:w-20">
                      <Image
                        src={integration.logo}
                        alt={`${integration.name} logo`}
                        fill
                        className={`object-contain ${needsScaling ? "scale-125" : ""}`}
                        sizes="(max-width: 640px) 48px, 80px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
