"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "blue-purple" | "teal-blue" | "holographic";
  className?: string;
}

export function GradientText({ children, variant = "blue-purple", className }: GradientTextProps) {
  return (
    <span
      className={cn(
        variant === "blue-purple" && "gradient-text",
        variant === "teal-blue" && "gradient-text-teal",
        variant === "holographic" && "gradient-text-holographic",
        className
      )}
    >
      {children}
    </span>
  );
}
