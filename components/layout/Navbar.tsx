"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import MagneticButton from "@/components/effects/MagneticButton";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-500 border-b",
        isScrolled
          ? "border-white/[0.06]"
          : "bg-transparent border-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glass blur layer — only when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute inset-0 bg-bg-primary/50 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Gradient border line on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <div className="container-custom flex items-center justify-between py-4 relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative w-10 h-10 rounded-xl overflow-hidden shadow-glow-blue border border-border"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Image src="/images/logo fliq.jpg" alt="Codefliq Logo" fill className="object-cover" />
          </motion.div>
          <span className="font-display font-bold text-xl tracking-tight text-text-primary">
            Codefliq<span className="text-accent-blue">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <MagneticButton key={link.name} strength={0.15}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 hover:text-white relative py-1",
                    pathname === link.href ? "text-white" : "text-text-muted"
                  )}
                >
                  {link.name}
                  {/* Active indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: pathname === link.href ? 1 : 0,
                      opacity: pathname === link.href ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Hover indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-blue/40 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            </MagneticButton>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <MagneticButton>
            <Button
              asChild
              variant="gradient"
              size="sm"
              className="shadow-glow-purple/30 hover:shadow-glow-purple transition-shadow duration-500"
            >
              <Link href="/contact">Start a Project</Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-text-primary p-2 -mr-2 relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-bg-card/95 backdrop-blur-2xl border-b border-border shadow-card flex flex-col gap-2 md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block p-3 rounded-xl text-base font-medium transition-all duration-300",
                      pathname === link.href
                        ? "bg-accent-blue/10 text-white border border-accent-blue/20"
                        : "text-text-muted hover:bg-bg-elevated hover:text-text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Button asChild variant="gradient" className="w-full">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
