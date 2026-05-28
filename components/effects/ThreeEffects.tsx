"use client";

import { ReactNode, useRef, MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  active?: boolean;
}

export function GlitchText({ children, className, as: Tag = "span", active = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(active);

  return (
    <Tag
      className={cn("glitch-text relative inline-block", className)}
      data-text={children}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {children}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-accent-blue pointer-events-none"
            style={{ clipPath: "inset(20% 0 60% 0)" }}
            animate={{ x: [-3, 3, -2, 2, 0], opacity: [0.8, 0.6, 0.9, 0.4, 0] }}
            transition={{ duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] }}
            aria-hidden
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-accent-purple pointer-events-none"
            style={{ clipPath: "inset(60% 0 20% 0)" }}
            animate={{ x: [3, -3, 2, -2, 0], opacity: [0.8, 0.5, 0.8, 0.3, 0] }}
            transition={{ duration: 0.4, delay: 0.05, times: [0, 0.25, 0.5, 0.75, 1] }}
            aria-hidden
          >
            {children}
          </motion.span>
        </>
      )}
    </Tag>
  );
}

/* ── Depth Scroll Wrapper ──────────────────────────────────────────────────── */
interface DepthScrollProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export function DepthScroll({ children, className, depth = 1 }: DepthScrollProps) {
  return (
    <motion.div
      className={cn("parallax-container", className)}
      initial={{ opacity: 0, z: -150 * depth, filter: "blur(6px)", scale: 0.9 }}
      whileInView={{ opacity: 1, z: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Spotlight Container ───────────────────────────────────────────────────── */
interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

export function Spotlight({ children, className }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Spotlight glow */}
      <motion.div
        className="absolute pointer-events-none z-0 rounded-full"
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(79,110,247,0.07) 0%, transparent 70%)",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className={cn("relative z-10 w-full h-full", className)}>{children}</div>
    </div>
  );
}
