"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  stars: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCard({ stars, text, author, role, avatar }: TestimonialCardProps) {
  return (
    <div className="group p-8 h-full flex flex-col relative overflow-hidden bg-transparent">
      {/* Holographic scanline on hover */}
      <div className="holographic-scanline" />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-blue/10 to-transparent rounded-bl-3xl pointer-events-none" />

      {/* Stars */}
      <div className="flex gap-1 mb-5 relative z-10" style={{ transform: "translateZ(20px)" }}>
        {Array.from({ length: stars }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 15 }}
            viewport={{ once: true }}
          >
            <Star size={16} className="text-accent-blue fill-accent-blue" />
          </motion.div>
        ))}
      </div>

      {/* Quote text */}
      <blockquote
        className="text-text-muted leading-relaxed flex-1 relative z-10 italic"
        style={{ transform: "translateZ(10px)" }}
      >
        &ldquo;{text}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10" style={{ transform: "translateZ(25px)" }}>
        <motion.div
          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent-blue/30 shrink-0"
          whileHover={{ scale: 1.1, borderColor: "rgba(79,110,247,0.8)" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Image src={avatar} alt={author} fill className="object-cover" />
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(79,110,247,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        <div>
          <div className="font-bold text-sm text-text-primary">{author}</div>
          <div className="text-xs text-text-muted">{role}</div>
        </div>

        {/* Verified badge */}
        <div className="ml-auto">
          <div className="w-5 h-5 rounded-full bg-accent-blue/20 border border-accent-blue/40 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5L4 7L8 3" stroke="#4f6ef7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
