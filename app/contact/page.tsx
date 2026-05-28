"use client";

import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Lightweight Gradient overlays for aesthetic dark theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary/80 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,transparent_0%,rgba(10,10,15,0.6)_100%)] pointer-events-none" />

      {/* Ambient glows to keep it premium but highly performant */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Centered Visme Form */}
      <div className="container-custom relative z-10 w-full flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center min-h-[600px]">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
