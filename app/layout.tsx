import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google"; // Changed from Montserrat
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({ // Changed from montserrat
  weight: ['400', '700'], // Poppins needs explicit weights
  variable: "--font-poppins", // Changed from --font-montserrat
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlfredAI - AI Fee Proposal Generator",
  description: "Automate the creation of professional fee proposals. Save 80% of your time and increase win rates by 40%.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`} // Changed from montserrat.variable
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
