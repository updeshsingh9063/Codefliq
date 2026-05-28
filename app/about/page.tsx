"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { HolographicBadge } from "@/components/ui/HolographicBadge";
import { GradientText } from "@/components/ui/GradientText";
import Card3D from "@/components/ui/Card3D";
import GlassMorphismPanel from "@/components/ui/GlassMorphismPanel";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { DepthScroll } from "@/components/effects/ThreeEffects";
import { CheckCircle2 } from "lucide-react";

const SceneLoader = dynamic(() => import("@/components/three/SceneLoader"), { ssr: false });
const FloatingLogos = dynamic(() => import("@/components/three/FloatingLogos"), { ssr: false });

const TECH = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Figma"];
const VALUES = ["Quality over quantity", "Transparency in process", "Long-term partnerships"];

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Mission ── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-32">
          <ScrollReveal direction="left">
            <HolographicBadge label="About Codefliq" />
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 mt-4">
              We build digital products that <GradientText variant="holographic">make an impact.</GradientText>
            </h1>
            <p className="text-lg text-text-muted mb-6">
              Founded by a team of senior engineers and designers, Codefliq was born from a frustration with traditional agency models. We saw too many bloated WordPress sites, unmaintainable spaghetti code, and beautiful designs that didn&apos;t convert.
            </p>
            <p className="text-lg text-text-muted mb-8">
              We decided to build a studio focused on engineering excellence, modern tech stacks (React, Next.js), and measurable business outcomes.
            </p>
            <div className="space-y-4">
              {VALUES.map((val, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="right">
                  <motion.div
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <CheckCircle2 className="text-accent-blue" size={20} />
                    </motion.div>
                    <span className="font-medium text-text-primary group-hover:text-accent-blue transition-colors">{val}</span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="depth" delay={0.2}>
            <Card3D intensity={10} holographic>
              <div className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                  alt="Codefliq Team collaborating"
                  fill
                  className="object-cover"
                />
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
                {/* Floating badge */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <GlassMorphismPanel className="px-5 py-3" glow="teal" depth="deep">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                      <span className="text-sm font-medium text-text-primary">Available for new projects</span>
                    </div>
                  </GlassMorphismPanel>
                </motion.div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>

        {/* ── Tech Stack ── */}
        <div className="py-16 border-y border-border mb-32 relative">
          <ScrollReveal>
            <div className="text-center mb-8">
              <HolographicBadge label="Powered by modern technology" variant="teal" />
            </div>
          </ScrollReveal>

          {/* 3D Floating Logos */}
          <div className="relative h-[380px] w-full">
            <SceneLoader camera={{ position: [0, 0, 6], fov: 50 }} postProcessing bloomIntensity={0.4}>
              <FloatingLogos />
            </SceneLoader>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-6">
            {TECH.map((tech, i) => (
              <ScrollReveal key={tech} delay={i * 0.05} direction="up">
                <motion.div
                  className="text-sm font-display font-bold text-text-muted cursor-default"
                  whileHover={{ color: "#4f6ef7", y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tech}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── Founder ── */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <HolographicBadge label="Leadership" variant="rainbow" />
            <h2 className="text-4xl font-display font-bold mb-6 mt-4">Meet the founder</h2>
          </div>
        </ScrollReveal>

        <DepthScroll depth={1.2}>
          <Card3D intensity={5} holographic className="max-w-4xl mx-auto">
            <GlassMorphismPanel glow="blue" depth="deep" className="p-6 md:p-12">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden shrink-0 border-4 border-bg-elevated shadow-xl">
                  <Image
                    src="/images/updesh me.jpg"
                    alt="Updesh"
                    fill
                    className="object-cover"
                  />
                  {/* Orbit ring around avatar */}
                  <motion.div
                    className="absolute inset-[-8px] rounded-full border border-accent-blue/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold mb-2">Updesh</h3>
                  <p className="text-accent-blue font-medium mb-6">Lead Engineer & Founder</p>
                  <p className="text-text-muted text-lg leading-relaxed mb-6">
                    &ldquo;I started Codefliq to build software that bridges the gap between stunning design and high performance. My goal is simple: deliver engineering excellence and measurable business outcomes for our clients.&rdquo;
                  </p>
                  <div className="flex gap-4">
                    {[
                      { label: "LinkedIn", href: "#" },
                      { label: "GitHub", href: "#" },
                    ].map(({ label, href }) => (
                      <motion.a
                        key={label}
                        href={href}
                        className="text-text-muted hover:text-accent-blue transition-colors font-medium"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </GlassMorphismPanel>
          </Card3D>
        </DepthScroll>
      </div>
    </div>
  );
}
