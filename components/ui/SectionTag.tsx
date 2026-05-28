import { cn } from "@/lib/utils";
import React from "react";

interface SectionTagProps {
  label: string;
  className?: string;
}

export function SectionTag({ label, className }: SectionTagProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-elevated border border-border text-sm font-medium text-accent-blue tracking-wide mb-6", className)}>
      <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse-slow"></span>
      {label}
    </div>
  );
}
