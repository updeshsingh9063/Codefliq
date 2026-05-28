"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { HolographicBadge } from "@/components/ui/HolographicBadge";
import { GradientText } from "@/components/ui/GradientText";
import Card3D from "@/components/ui/Card3D";
import GlassMorphismPanel from "@/components/ui/GlassMorphismPanel";
import ScrollReveal from "@/components/effects/ScrollReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, title: "Nexus Dashboard", category: "web app", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", tech: ["Next.js", "Prisma", "Tailwind"], link: "#", featured: true },
  { id: 2, title: "Elevate FinTech", category: "website", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", tech: ["React", "Framer Motion", "GSAP"], link: "#", featured: false },
  { id: 3, title: "Lumina Health App", category: "ui/ux", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000", tech: ["Figma", "Protopie"], link: "#", featured: false },
  { id: 4, title: "Aura E-Commerce", category: "web app", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000", tech: ["Next.js", "Stripe", "Sanity"], link: "#", featured: false },
  { id: 5, title: "Orbit CRM", category: "web app", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000", tech: ["Vue", "Node.js", "PostgreSQL"], link: "#", featured: false },
  { id: 6, title: "Vanguard Marketing", category: "website", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1000", tech: ["Webflow", "Custom Code"], link: "#", featured: false },
];

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "website", label: "Websites" },
  { id: "web app", label: "Web Apps" },
  { id: "ui/ux", label: "UI/UX Design" },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = PROJECTS.filter((p) => activeFilter === "all" || p.category === activeFilter);
  const featured = PROJECTS.find((p) => p.featured);

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <ScrollReveal direction="depth">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <HolographicBadge label="Our Portfolio" variant="rainbow" />
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 mt-4">
              Work we&apos;re <GradientText variant="holographic">proud of.</GradientText>
            </h1>
            <p className="text-lg text-text-muted">
              Explore our recent projects spanning across SaaS platforms, marketing websites, and complex web applications.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Project */}
        {featured && activeFilter === "all" && (
          <ScrollReveal delay={0.15} direction="shatter">
            <div className="mb-20">
              <Card3D intensity={4} holographic>
                <Link href={featured.link} className="group block relative rounded-3xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[4/3] md:aspect-auto">
                      <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-card to-transparent opacity-80" />
                    </div>
                    <GlassMorphismPanel className="p-6 md:p-12 flex flex-col justify-center rounded-none" glow="blue" depth="deep">
                      <div className="text-accent-blue font-bold tracking-widest text-sm uppercase mb-4">Featured Case Study</div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 group-hover:text-accent-blue transition-colors">
                        {featured.title}
                      </h3>
                      <p className="text-text-muted mb-8 text-lg">
                        A comprehensive data dashboard built for enterprise teams. We handled everything from initial UI/UX wireframes to complex state management and API integrations.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featured.tech.map((t) => (
                          <span key={t} className="px-3 py-1 bg-bg-elevated rounded-full text-xs font-medium text-text-muted border border-border">
                            {t}
                          </span>
                        ))}
                      </div>
                      <motion.div className="flex items-center gap-2 text-text-primary font-bold" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                        View Project <ExternalLink size={18} />
                      </motion.div>
                    </GlassMorphismPanel>
                  </div>
                </Link>
              </Card3D>
            </div>
          </ScrollReveal>
        )}

        {/* Filters */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTERS.map((filter) => (
              <MagneticButton key={filter.id} strength={0.15}>
                <motion.button
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-glow-purple/30"
                      : "bg-bg-elevated text-text-muted hover:text-text-primary border border-border hover:border-accent-blue/30"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                </motion.button>
              </MagneticButton>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card3D intensity={9} holographic>
                  <Link href={project.link} className="group block h-full">
                    <div className="rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-bg-primary/60 backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-white font-bold flex items-center gap-2">
                            View Project <ExternalLink size={16} />
                          </span>
                        </motion.div>
                      </div>
                      <div className="p-6 flex flex-col flex-1 bg-bg-card/80 backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors duration-300">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-auto pt-4">
                          {project.tech.map((t) => (
                            <span key={t} className="px-2 py-1 bg-bg-elevated rounded-md text-xs font-medium text-text-muted">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
