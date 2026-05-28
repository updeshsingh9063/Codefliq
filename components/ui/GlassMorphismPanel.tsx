"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassMorphismPanelProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  glow?: "blue" | "purple" | "teal" | "none";
  depth?: "shallow" | "medium" | "deep";
}

const glowMap = {
  blue: "shadow-[0_0_60px_-10px_rgba(79,110,247,0.3),inset_0_1px_0_rgba(79,110,247,0.1)]",
  purple: "shadow-[0_0_60px_-10px_rgba(124,92,252,0.3),inset_0_1px_0_rgba(124,92,252,0.1)]",
  teal: "shadow-[0_0_60px_-10px_rgba(0,229,195,0.3),inset_0_1px_0_rgba(0,229,195,0.1)]",
  none: "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]",
};

const depthMap = {
  shallow: "backdrop-blur-[12px]",
  medium: "backdrop-blur-[24px]",
  deep: "backdrop-blur-[40px] saturate-150",
};

export default function GlassMorphismPanel({
  children,
  className,
  animated = false,
  glow = "blue",
  depth = "medium",
}: GlassMorphismPanelProps) {
  const base = cn(
    "relative rounded-2xl border border-white/[0.07] overflow-hidden",
    "bg-[rgba(15,15,30,0.55)]",
    depthMap[depth],
    glowMap[glow],
    className
  );

  if (animated) {
    return (
      <motion.div
        className={cn(base, "animated-gradient-border")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {/* Inner highlight line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        {children}
      </motion.div>
    );
  }

  return (
    <div className={base}>
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
