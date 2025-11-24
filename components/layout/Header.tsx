"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Image
              src="/alfredai.png"
              alt="AlfredAI Logo"
              width={179}
              height={42}
              className="h-8 w-auto"
              priority
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-semibold leading-6 text-slate-900 hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-semibold leading-6 text-slate-900 hover:text-primary transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-sm font-semibold leading-6 text-slate-900 hover:text-primary transition-colors"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-semibold leading-6 text-slate-900 hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-b border-slate-200"
          >
            <div className="space-y-1 px-6 pb-6 pt-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full rounded-lg px-3 py-2 text-left text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
              >
                Contact
              </button>
              <div className="pt-4">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => scrollToSection("contact")}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
