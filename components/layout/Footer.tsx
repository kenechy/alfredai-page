import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/alfredai.png"
              alt="AlfredAI Logo"
              width={179}
              height={42}
              className="h-6 w-auto"
            />
            <p className="mt-2 text-sm text-slate-600">
              Copyright {currentYear} AlfredAI. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <a
              href="mailto:enquiry@alfredai.bot"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              enquiry@alfredai.bot
            </a>
            <a
              href="tel:+610257598881"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              +61 02 5759 8881
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}