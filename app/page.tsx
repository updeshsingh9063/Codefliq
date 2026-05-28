"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { HolographicBadge } from "@/components/ui/HolographicBadge";
import Card3D from "@/components/ui/Card3D";
import GlassMorphismPanel from "@/components/ui/GlassMorphismPanel";
import ScrollReveal from "@/components/effects/ScrollReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import { Spotlight } from "@/components/effects/ThreeEffects";
import {
  Code2, MonitorPlay, Smartphone, Zap, Layers, InfinityIcon,
  ArrowRight, CheckCircle2, MessageSquare,
} from "lucide-react";

const SceneLoader = dynamic(() => import("@/components/three/SceneLoader"), { ssr: false });
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });
const NeuralNetwork3D = dynamic(() => import("@/components/three/NeuralNetwork3D"), { ssr: false });
const ProcessPipeline = dynamic(() => import("@/components/three/ProcessPipeline"), { ssr: false });
const AbstractBlob = dynamic(() => import("@/components/three/AbstractBlob"), { ssr: false });

const SERVICES = [
  { icon: MonitorPlay, title: "Custom Websites", description: "High-performance, SEO-optimized marketing websites that convert visitors into customers.", href: "/services#web", delay: 0 },
  { icon: Code2, title: "Web App Development", description: "Complex SaaS platforms and portals built with React, Next.js, and robust backend architectures.", href: "/services#app", delay: 0.1 },
  { icon: Layers, title: "UI/UX Design", description: "Intuitive, modern, and engaging user interfaces designed in Figma to elevate your brand.", href: "/services#design", delay: 0.15 },
  { icon: Zap, title: "Performance Optimization", description: "Speed up your existing app. We audit, refactor, and optimize for Core Web Vitals.", href: "/services#perf", delay: 0.2 },
  { icon: InfinityIcon, title: "API Integrations", description: "Connect your systems. We build and integrate RESTful and GraphQL APIs seamlessly.", href: "/services#api", delay: 0.25 },
  { icon: Smartphone, title: "Mobile-First Approach", description: "Every project is guaranteed to look and function perfectly across all devices.", href: "/services#mobile", delay: 0.3 },
];

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Codefliq completely transformed our web presence. The new SaaS platform is blazing fast, and our conversion rate doubled in the first month.",
    author: "Sarah Jenkins", role: "CEO, TechFlow Inc",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    stars: 5,
    text: "Professional, responsive, and incredibly talented. They didn't just build what we asked for, they improved upon our original vision.",
    author: "Marcus Chen", role: "Founder, Elevate App",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    stars: 5,
    text: "The cleanest codebase I've ever received from an agency. Their use of Next.js and Tailwind made it incredibly easy for our internal team to take over.",
    author: "Elena Rodriguez", role: "CTO, Nexus Health",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Full 3D background */}
        <div className="absolute inset-0 z-0">
          <SceneLoader camera={{ position: [0, 0, 7], fov: 58 }} postProcessing bloomIntensity={0.6}>
            <HeroScene />
          </SceneLoader>
        </div>

        {/* Radial hero vignette */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(79,110,247,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-bg-primary/95 pointer-events-none" />

        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <ScrollReveal delay={0}>
            <HolographicBadge label="Codefliq Studio" variant="rainbow" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="depth">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-6 max-w-5xl mt-6">
              Your vision. Our code.{" "}
              <br className="hidden md:block" />
              <GradientText variant="holographic">Real results.</GradientText>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl">
              We build high-converting SaaS platforms, custom web apps, and premium websites that scale your business. Don&apos;t settle for templates.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <MagneticButton>
                <Button asChild size="lg" variant="gradient" className="gap-2 shadow-glow-purple hover:shadow-glow-blue transition-shadow duration-500">
                  <Link href="/contact">Start a Project <ArrowRight size={18} /></Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.4}>
            <GlassMorphismPanel className="px-4 py-6 md:px-8 w-full max-w-4xl" glow="blue" depth="medium">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                <AnimatedCounter value={50} label="Projects Delivered" suffix="+" />
                <AnimatedCounter value={100} label="Client Satisfaction" suffix="%" />
                <AnimatedCounter value={15} label="Years Experience" suffix="+" />
                <AnimatedCounter value={24} label="Support" suffix="/7" />
              </div>
            </GlassMorphismPanel>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-10 border-y border-border bg-bg-secondary/50 overflow-hidden relative">
        <div
          className="marquee-track flex gap-12 items-center text-2xl md:text-3xl font-display font-bold text-text-muted/30 whitespace-nowrap"
          style={{ perspective: "1000px", transform: "rotateX(3deg)" }}
        >
          {["CUSTOM WEB DESIGN", "SAAS DEVELOPMENT", "UI/UX PROTOTYPING", "API INTEGRATIONS", "ENTERPRISE SOLUTIONS",
            "CUSTOM WEB DESIGN", "SAAS DEVELOPMENT", "UI/UX PROTOTYPING", "API INTEGRATIONS", "ENTERPRISE SOLUTIONS"].map((text, i) => (
            <span key={i} className={i % 2 === 1 ? "text-accent-blue/60" : ""}>{i % 2 === 1 ? "•" : text}</span>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding container-custom relative overflow-hidden">
        {/* Neural Network 3D background */}
        <div className="absolute inset-0 z-0 opacity-50">
          <SceneLoader camera={{ position: [0, 2, 9], fov: 60 }}>
            <NeuralNetwork3D />
          </SceneLoader>
        </div>

        <div className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <HolographicBadge label="Our Expertise" />
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 mt-4">
                Digital solutions that <GradientText variant="teal-blue">drive growth.</GradientText>
              </h2>
              <p className="text-text-muted text-lg">
                End-to-end development services tailored to your business needs, built with modern tech stacks and pixel-perfect precision.
              </p>
            </div>
          </ScrollReveal>

          <Spotlight className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ScrollReveal key={service.title} delay={service.delay} direction="shatter">
                <Card3D intensity={10} holographic>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    href={service.href}
                  />
                </Card3D>
              </ScrollReveal>
            ))}
          </Spotlight>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section-padding bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <SceneLoader camera={{ position: [0, 0, 6], fov: 50 }}>
            <ProcessPipeline />
          </SceneLoader>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <ScrollReveal direction="left" className="flex-1">
              <HolographicBadge label="Our Process" variant="teal" />
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 mt-4">
                How we turn ideas into <GradientText>reality.</GradientText>
              </h2>
              <p className="text-text-muted text-lg mb-8">
                We believe in transparency, agile development, and continuous communication. Here&apos;s our proven 5-step framework.
              </p>
              <MagneticButton>
                <Button asChild variant="outline">
                  <Link href="/about">Learn more about us</Link>
                </Button>
              </MagneticButton>
            </ScrollReveal>

            <div className="flex-1 w-full max-w-xl relative">
              <div className="space-y-6">
                {[
                  { step: "01", title: "Discovery", desc: "We dive deep into your business goals, target audience, and project requirements." },
                  { step: "02", title: "Design", desc: "Wireframes and high-fidelity UI prototypes for your approval before coding starts." },
                  { step: "03", title: "Development", desc: "Writing clean, scalable code using the latest modern tech stack." },
                  { step: "04", title: "Testing", desc: "Rigorous QA testing across devices, browsers, and performance metrics." },
                  { step: "05", title: "Launch", desc: "Deployment to production, SEO setup, and post-launch monitoring." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.08} direction="right">
                    <motion.div
                      className="flex gap-5 relative group"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center shrink-0 text-lg font-display font-bold text-accent-blue z-10 relative"
                        whileHover={{ backgroundColor: "rgba(79,110,247,1)", color: "#fff", boxShadow: "0 0 30px rgba(79,110,247,0.5)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.step}
                      </motion.div>
                      <div className="pt-3">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-accent-blue transition-colors">{item.title}</h3>
                        <p className="text-text-muted text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section-padding container-custom">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <SceneLoader camera={{ position: [0, 0, 6], fov: 50 }}>
                  <AbstractBlob />
                </SceneLoader>
              </div>
              <Card3D intensity={15} border={false}>
                <div className="relative w-full max-w-sm aspect-[1.6/1] rounded-xl bg-gradient-to-br from-bg-elevated/90 to-bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <motion.div
                      className="relative w-12 h-12 rounded-xl overflow-hidden shadow-glow-blue border border-border"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Image src="/images/logo fliq.jpg" alt="Codefliq Logo" fill className="object-cover" />
                    </motion.div>
                    <div className="text-right">
                      <div className="font-display font-bold tracking-wider">CODEFLIQ</div>
                      <div className="text-xs text-text-muted uppercase tracking-widest">Studio</div>
                    </div>
                  </div>
                  <div>
                    <div className="w-12 h-1 bg-accent-blue rounded-full mb-4" />
                    <div className="text-sm text-text-muted font-mono">Premium Digital Partner</div>
                  </div>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <HolographicBadge label="Why Choose Us" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 mt-4">
              More than just an agency. Your <GradientText>technical partner.</GradientText>
            </h2>
            <div className="space-y-5">
              {[
                { title: "Boutique Focus", desc: "We limit our active projects to ensure your product gets the senior-level attention it deserves." },
                { title: "Business-First Approach", desc: "We don't just write code; we build solutions designed to increase your conversion rates and revenue." },
                { title: "Modern Tech Stack", desc: "We use Next.js, React, and modern architectures for blazing fast performance and SEO." },
                { title: "Zero Lock-in", desc: "You own 100% of the code, assets, and infrastructure from day one." },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08} direction="right">
                  <motion.div
                    className="flex gap-4 group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                      <CheckCircle2 className="text-accent-blue shrink-0 mt-1 group-hover:text-accent-teal transition-colors" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-bg-secondary relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <HolographicBadge label="Testimonials" variant="rainbow" />
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 mt-4">
                Don&apos;t just take our <GradientText variant="teal-blue">word for it.</GradientText>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <ScrollReveal key={i} delay={i * 0.12} direction="depth">
                <Card3D intensity={7} holographic>
                  <TestimonialCard {...testimonial} />
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-16 md:pt-24 pb-40 md:pb-64 relative overflow-hidden">
        {/* Warp-style speed lines background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent"
              style={{
                width: `${60 + ((i * 13) % 40)}%`,
                rotate: `${(i / 12) * 360}deg`,
                transformOrigin: "left center",
              }}
              animate={{ scaleX: [0.3, 1, 0.3], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10 mb-24 md:mb-32">
          <ScrollReveal direction="scale">
            <Card3D intensity={4} glare holographic>
              <GlassMorphismPanel glow="purple" depth="deep" className="rounded-3xl overflow-hidden">
                <div className="relative p-6 md:p-12 lg:p-20 text-center flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 20px rgba(79,110,247,0.3)", "0 0 60px rgba(79,110,247,0.6)", "0 0 20px rgba(79,110,247,0.3)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center mb-6"
                  >
                    <MessageSquare size={28} className="text-accent-blue" />
                  </motion.div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                    Ready to build something <br className="hidden md:block" />
                    <GradientText variant="holographic">extraordinary?</GradientText>
                  </h2>
                  <p className="text-lg text-text-muted max-w-2xl mb-10">
                    Let&apos;s discuss your project requirements. We respond within 24 hours with a free consultation and project estimate.
                  </p>
                  <MagneticButton strength={0.4}>
                    <Button asChild size="lg" variant="gradient" className="text-lg px-10 h-16 rounded-full shadow-glow-purple hover:shadow-glow-blue hover:scale-105 transition-all duration-500">
                      <Link href="/contact">Get in Touch <ArrowRight size={18} className="ml-2" /></Link>
                    </Button>
                  </MagneticButton>
                </div>
              </GlassMorphismPanel>
            </Card3D>
          </ScrollReveal>
        </div>
      </section>

      {/* WhatsApp Button */}
      {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
        <motion.a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg z-50"
          whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(37,211,102,0.5)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </motion.a>
      )}
    </div>
  );
}
