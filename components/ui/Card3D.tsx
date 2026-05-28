"use client";

import { useRef, ReactNode, MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  border?: boolean;
  glare?: boolean;
  holographic?: boolean;
}

export default function Card3D({
  children,
  className,
  intensity = 10,
  border = true,
  glare = true,
  holographic = false,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotation({
      x: ((y - centerY) / centerY) * -intensity,
      y: ((x - centerX) / centerX) * intensity,
    });
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  return (
    <div className="perspective-container">
      <motion.div
        ref={cardRef}
        className={cn(
          "card-3d relative overflow-hidden",
          border && "glass-card",
          holographic && "animated-gradient-border",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setRotation({ x: 0, y: 0 }); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic scanline */}
        {holographic && (
          <div className="holographic-scanline" />
        )}

        {/* Edge glow */}
        <div
          className="edge-glow"
          style={{
            "--mouse-x": `${mousePos.x}%`,
            "--mouse-y": `${mousePos.y}%`,
          } as React.CSSProperties}
        />

        {/* Light reflection */}
        {glare && (
          <motion.div
            className="card-3d-reflection"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              "--mouse-x": `${mousePos.x}%`,
              "--mouse-y": `${mousePos.y}%`,
            } as React.CSSProperties}
          />
        )}

        {/* Inner shimmer on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-inherit"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(79,110,247,0.06) 0%, transparent 50%)`,
          }}
        />

        {children}
      </motion.div>
    </div>
  );
}
