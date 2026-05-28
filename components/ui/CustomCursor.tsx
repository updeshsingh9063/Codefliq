"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only activate on desktop (no touch)
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest(".magnetic-wrap");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop for smooth following
    let animationId: number;
    const animate = () => {
      // Dot follows mouse directly
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.5;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.5;

      // Ring follows with more lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px)`;
      }
      if (ringRef.current) {
        const ringSize = isHovered ? 30 : 20;
        ringRef.current.style.transform = `translate(${ringPos.current.x - ringSize}px, ${ringPos.current.y - ringSize}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isVisible, isHovered]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on SSR to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovered ? "hovered" : ""}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.2s ease, height 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? "hovered" : ""}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />
    </>
  );
}
