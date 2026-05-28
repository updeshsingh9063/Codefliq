"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "scale" | "depth" | "rotate3d" | "shatter";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

const variants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  depth: {
    hidden: { opacity: 0, filter: "blur(8px)", y: 40, scale: 0.95 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 },
  },
  rotate3d: {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  },
  shatter: {
    hidden: { opacity: 0, scale: 0.8, rotate: -3, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)" },
  },
};

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const needsPerspective = ["depth", "rotate3d", "shatter"].includes(direction);

  return (
    <motion.div
      className={cn(needsPerspective && "perspective-deep", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={needsPerspective ? { transformStyle: "preserve-3d" } : undefined}
    >
      {children}
    </motion.div>
  );
}
