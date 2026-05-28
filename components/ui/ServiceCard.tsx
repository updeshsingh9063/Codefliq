"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  features?: string[];
}

export function ServiceCard({ icon: Icon, title, description, href = "/services", features = [] }: ServiceCardProps) {
  return (
    <div className="group p-8 transition-all duration-500 relative overflow-hidden h-full flex flex-col bg-transparent">
      {/* Hover background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/8 via-transparent to-accent-purple/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col" style={{ transformStyle: "preserve-3d" }}>
        {/* Icon — raised Z layer */}
        <motion.div
          className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center text-accent-blue mb-6"
          style={{ transform: "translateZ(30px)" }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <div className="group-hover:text-accent-blue transition-colors duration-300">
            <Icon size={26} strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title — raised Z layer */}
        <h3
          className="text-xl font-display font-bold mb-4 group-hover:text-accent-blue transition-colors duration-300"
          style={{ transform: "translateZ(20px)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-text-muted mb-6 flex-1">{description}</p>

        {features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-text-muted"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <CheckCircle2 size={15} className="text-accent-teal mt-0.5 shrink-0" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors mt-auto w-fit"
        >
          Learn more
          <motion.span
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <ChevronRight size={16} />
          </motion.span>
        </Link>
      </div>
    </div>
  );
}
