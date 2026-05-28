"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const SOCIAL = [
  { label: "𝕏", href: "#" },
  { label: "In", href: "#" },
  { label: "Gh", href: "#" },
];

const SERVICES_LINKS = ["Web Development", "UI/UX Design", "App Development", "Maintenance"];
const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border pt-12 md:pt-16 pb-8 relative overflow-hidden">
      {/* Animated glow orbs */}
      <motion.div
        className="glow-orb w-96 h-96 bg-accent-blue/8 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="glow-orb w-64 h-64 bg-accent-purple/5 top-0 right-0 -translate-y-1/2 translate-x-1/2" />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
              <motion.div
                className="relative w-10 h-10 rounded-xl overflow-hidden shadow-glow-blue border border-border"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Image src="/images/logo fliq.jpg" alt="Codefliq Logo" fill className="object-cover" />
              </motion.div>
              <span className="font-display font-bold text-xl tracking-tight">
                Codefliq<span className="text-accent-blue">.</span>
              </span>
            </Link>
            <p className="text-text-muted max-w-sm mb-6 text-sm leading-relaxed">
              Your vision. Our code. Real results. We are a premium digital partner for startups, entrepreneurs, and growing businesses.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-text-muted border border-border text-sm font-medium"
                  whileHover={{
                    y: -3,
                    color: "#fff",
                    backgroundColor: "rgba(79,110,247,0.15)",
                    borderColor: "rgba(79,110,247,0.4)",
                    boxShadow: "0 0 20px rgba(79,110,247,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-base mb-5">Services</h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((label) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <Link
                      href="/services"
                      className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-bold text-base mb-5">Company</h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                    <Link
                      href={href}
                      className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© {currentYear} Codefliq. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-accent-blue"
            >
              ♥
            </motion.span>
            precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
