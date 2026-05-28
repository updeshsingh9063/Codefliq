"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicBadgeProps {
  label: string;
  className?: string;
  variant?: "default" | "rainbow" | "teal";
}

export function HolographicBadge({ label, className, variant = "default" }: HolographicBadgeProps) {
  return (
    <motion.div
      className={cn("inline-flex items-center gap-2 relative", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Projection lines above */}
      <div className="absolute -top-4 left-1/4 w-px h-4 bg-gradient-to-b from-transparent to-accent-blue/50" />
      <div className="absolute -top-4 right-1/4 w-px h-4 bg-gradient-to-b from-transparent to-accent-blue/50" />

      <div
        className={cn(
          "relative px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase overflow-hidden",
          variant === "rainbow" && "rainbow-shimmer",
          variant === "default" && "bg-accent-blue/10 border border-accent-blue/30",
          variant === "teal" && "bg-accent-teal/10 border border-accent-teal/30"
        )}
      >
        {/* Sweeping highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />

        {/* Dot indicator */}
        <span className="inline-flex items-center gap-2">
          <span className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            variant === "teal" ? "bg-accent-teal" : "bg-accent-blue"
          )} />
          <span className={cn(
            variant === "rainbow" ? "gradient-text-holographic" :
            variant === "teal" ? "text-accent-teal" : "text-accent-blue"
          )}>
            {label}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
