import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/effects/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

// Load Syne for display/headings
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

// Load DM Sans for body
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Codefliq",
    default: "Codefliq — Premium Web & App Development Studio",
  },
  description: "Your vision. Our code. Real results. We are a premium digital partner for startups, entrepreneurs, and growing businesses.",
  keywords: ["web development", "app development", "UI/UX design", "Next.js", "SaaS agency"],
  openGraph: {
    title: "Codefliq — Premium Web & App Development Studio",
    description: "Your vision. Our code. Real results.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Codefliq",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-bg-primary text-text-primary min-h-screen flex flex-col relative noise-overlay">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#141428',
              color: '#e8e8f0',
              border: '1px solid rgba(255,255,255,0.07)',
            }
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
