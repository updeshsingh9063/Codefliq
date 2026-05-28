"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HolographicBadge } from "@/components/ui/HolographicBadge";
import { GradientText } from "@/components/ui/GradientText";
import { ServiceCard } from "@/components/ui/ServiceCard";
import Card3D from "@/components/ui/Card3D";
import GlassMorphismPanel from "@/components/ui/GlassMorphismPanel";
import ScrollReveal from "@/components/effects/ScrollReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import { Spotlight } from "@/components/effects/ThreeEffects";
import { Code2, MonitorPlay, Layers, InfinityIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const SceneLoader = dynamic(() => import("@/components/three/SceneLoader"), { ssr: false });
const NeuralNetwork3D = dynamic(() => import("@/components/three/NeuralNetwork3D"), { ssr: false });

const SERVICES = [
  {
    id: "web", icon: MonitorPlay, title: "Custom Website Design", delay: 0,
    description: "High-performance, SEO-optimized marketing websites that convert visitors into customers. Built with Next.js and Tailwind CSS for blazing speed.",
    features: ["Pixel-perfect responsive design", "Advanced technical SEO setup", "CMS integration (Sanity, Contentful)", "Sub-second load times"],
  },
  {
    id: "app", icon: Code2, title: "Web App Development", delay: 0.1,
    description: "Complex SaaS platforms, dashboards, and portals built with React, Next.js, and robust backend architectures (Node.js/PostgreSQL).",
    features: ["Complex state management", "Secure authentication & authorization", "Real-time data synchronization", "Scalable database architecture"],
  },
  {
    id: "design", icon: Layers, title: "UI/UX Design", delay: 0.15,
    description: "Intuitive, modern, and engaging user interfaces designed in Figma to elevate your brand and provide seamless user journeys.",
    features: ["Wireframing & Prototyping", "Design Systems & Component Libraries", "User testing & research", "Micro-interactions & animations"],
  },
  {
    id: "api", icon: InfinityIcon, title: "API Integration & Development", delay: 0.2,
    description: "Connect your systems seamlessly. We build custom RESTful and GraphQL APIs and integrate third-party services like Stripe, Twilio, or OpenAI.",
    features: ["Custom API endpoints", "Third-party webhook integrations", "Rate limiting & security", "Comprehensive API documentation"],
  },
];

const TIERS = [
  {
    title: "Project Based", price: "$5k+", priceLabel: "Starting at", popular: false, color: "none" as const,
    desc: "Fixed scope and price for clear deliverables.",
    features: ["Clear timeline & milestones", "Dedicated project manager", "Fixed budget guarantee"],
    href: "/contact?budget=$5,000 – $15,000", cta: "Get Quote", variant: "outline" as const,
  },
  {
    title: "Monthly Retainer", price: "$4k", priceLabel: "Starting at", priceSuffix: "/mo", popular: true, color: "blue" as const,
    desc: "Ongoing design and development support.",
    features: ["Guaranteed monthly hours", "Priority response time", "Continuous optimization", "Pause or cancel anytime"],
    href: "/contact", cta: "Start Retainer", variant: "gradient" as const,
  },
  {
    title: "Team Augmentation", price: "Custom", priceLabel: null, popular: false, color: "none" as const,
    desc: "Integrate our senior devs into your team.",
    features: ["Senior React/Next.js devs", "Direct Slack integration", "Daily standup participation"],
    href: "/contact?budget=Not sure yet", cta: "Let's Talk", variant: "outline" as const,
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen relative overflow-hidden">
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 z-0 opacity-35">
        <SceneLoader camera={{ position: [0, 3, 9], fov: 60 }}>
          <NeuralNetwork3D />
        </SceneLoader>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <ScrollReveal direction="depth">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <HolographicBadge label="Our Services" variant="rainbow" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 mt-4">
              Everything you need to <GradientText variant="holographic">scale digitally.</GradientText>
            </h1>
            <p className="text-lg text-text-muted">
              We offer end-to-end digital product development. From initial concept and UI/UX design to robust backend architecture and scalable deployments.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <Spotlight className="grid md:grid-cols-2 gap-8 mb-32">
          {SERVICES.map((service) => (
            <ScrollReveal key={service.id} delay={service.delay} direction="shatter">
              <div id={service.id} className="scroll-mt-32 h-full">
                <Card3D intensity={9} holographic className="h-full">
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                  />
                </Card3D>
              </div>
            </ScrollReveal>
          ))}
        </Spotlight>

        {/* Pricing */}
        <ScrollReveal direction="depth">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <HolographicBadge label="Engagement Models" variant="teal" />
            <h2 className="text-4xl font-display font-bold mb-6 mt-4">
              Flexible ways to work with us
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-40">
          {TIERS.map((tier, i) => (
            <ScrollReveal key={tier.title} delay={i * 0.1} direction="depth" className="h-full">
              <Card3D intensity={7} holographic={tier.popular} className="h-full">
                <GlassMorphismPanel
                  glow={tier.popular ? "blue" : "none"}
                  depth={tier.popular ? "deep" : "medium"}
                  className={`p-6 md:p-8 flex flex-col h-full relative ${tier.popular ? "lg:-translate-y-6" : ""}`}
                >
                  {tier.popular && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-t-2xl" />
                      <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full border border-accent-blue/20">
                        POPULAR
                      </div>
                    </>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                  <p className="text-text-muted mb-6 h-12">{tier.desc}</p>
                  <div className="mb-8">
                    {tier.priceLabel && <span className="text-sm text-text-muted">{tier.priceLabel}</span>}
                    <div className="text-4xl font-display font-bold mt-1">
                      {tier.price}
                      {tier.priceSuffix && <span className="text-xl text-text-muted font-normal">{tier.priceSuffix}</span>}
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <motion.li
                        key={j}
                        className="flex gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.08 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 size={20} className={tier.popular ? "text-accent-blue shrink-0" : "text-accent-teal shrink-0"} />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <MagneticButton className="w-full">
                    <Button asChild variant={tier.variant} className="w-full">
                      <Link href={tier.href}>{tier.cta}</Link>
                    </Button>
                  </MagneticButton>
                </GlassMorphismPanel>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
