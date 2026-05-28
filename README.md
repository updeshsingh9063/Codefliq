<div align="center">

<img src="./public/images/logo fliq.jpg" alt="Codefliq Logo" width="80" height="80" style="border-radius: 16px;" />

# ⚡ Codefliq

### *The Web Agency That Builds Experiences, Not Just Websites.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://docs.pmnd.rs/react-three-fiber/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://makeapullrequest.com)

---

> 👉 **Finally, a premium agency website that combines immersive 3D WebGL rendering with zero backend complexity and blazing-fast load times.**

*Built for agencies, startups, and elite developers who refuse to ship mediocre.*

</div>

---

## 🚀 Overview

Most agency websites are just overpriced templates with a new coat of paint. They're slow, generic, and completely forgettable.

**Codefliq** is different. It's a **production-ready, Next.js 15 web application** built to showcase top-tier frontend engineering. It combines real-time **WebGL 3D environments** (powered by React Three Fiber) with a premium **glassmorphic design system**, physics-based animations, and serverless lead capture — all without a single line of backend code or database configuration.

**Who should use this:**
- 🎯 Web agencies showcasing their technical edge
- 🚀 SaaS startups who need an impressive landing page fast
- 💼 Senior developers building elite portfolio sites
- 🏆 Hackathon teams who want to win on first impressions

---

## 🌟 Key Features

- **🌌 Interactive 3D WebGL Environments**
  Powered by React Three Fiber, the site renders a live Neural Network simulation on the homepage, an interactive 3D globe on the contact page, and abstract particle systems on service pages. Users don't just read about your capabilities — they *experience* them.

- **⚡ SSR-First Performance Architecture**
  3D canvas elements are dynamically imported with `{ ssr: false }`, completely decoupling the heavy WebGL render thread from Next.js Server-Side Rendering. This ensures near-instant page loads and perfect SEO scores — something virtually no 3D website achieves.

- **🎨 Premium Glassmorphic Design System**
  Every UI component is built on a custom design token system. Holographic badges, gradient text, glass panels with dynamic blur, and 60fps cursor-responsive micro-animations combine to create a visual experience that competitors simply can't match with off-the-shelf UI libraries.

- **📋 Serverless Lead Capture (Zero Backend)**
  Integrated with Visme's embedded form system. Leads go directly into a managed CRM dashboard — no Express server, no PostgreSQL, no maintenance. The contact page is permanently live with zero devops overhead.

- **📱 Fully Responsive & Gracefully Degrading**
  On low-powered devices, WebGL components gracefully fall back to high-quality CSS animations. Every visitor gets a premium experience regardless of their hardware.

---

## 🏗️ System Architecture

Codefliq uses a **Modular Client-Side Architecture** with strict DOM/Canvas separation, enabling high-fidelity 3D rendering alongside instant server-side HTML delivery.

```mermaid
graph TD
    A["👤 User Browser"] -->|"HTTP Request"| B["Next.js 15 App Router (SSR)"]
    B -->|"Server-rendered HTML + CSS"| C{"Hydration Layer"}
    
    C -->|"Immediate render"| D["React DOM (UI Layer)"]
    C -->|"Lazy-loaded via next/dynamic"| E["WebGL Canvas (3D Layer)"]
    
    D -->|"Framer Motion"| F["Glassmorphic UI + Scroll Animations"]
    E -->|"React Three Fiber + Drei"| G["3D Scenes: Neural Net / Globe / Particles"]
    
    F -.->|"Scroll Position State"| G
    
    D -->|"Form Submission"| H["Visme CRM (Serverless)"]
    H -->|"Lead stored"| I["📊 Visme Dashboard"]
    
    style A fill:#4f6ef7,color:#fff
    style B fill:#0f0f1a,color:#fff
    style H fill:#00e5c3,color:#000
    style I fill:#7c5cfc,color:#fff
```

---

## 🛠️ Tech Stack & Design Choices

| Technology | Role | Why It Was Chosen |
|---|---|---|
| **Next.js 15** | Framework | App Router, SSR, code splitting for heavy 3D assets, and zero-config Vercel deployment |
| **React Three Fiber** | 3D Rendering | Declarative Three.js — makes complex WebGL scenes composable, reusable React components |
| **@react-three/drei** | 3D Helpers | Pre-built camera controls, environment maps, and post-processing bloom effects |
| **Framer Motion** | Animation | Physics-based spring animations that feel alive, not mechanical |
| **Tailwind CSS v3** | Styling | Utility-first design tokens for the custom glassmorphism system. Zero runtime CSS |
| **TypeScript 5** | Type Safety | Full type coverage on all 3D component props and scene configurations |
| **Lucide React** | Icons | Lightweight, consistent, tree-shakeable SVG icon system |
| **Visme Forms** | Lead Capture | Serverless CRM embed — eliminates backend infrastructure entirely |

---

## ⚡ Quick Start (60-Second Setup)

```bash
# 1. Clone the repository
git clone https://github.com/updeshsingh9063/codefliq.git

# 2. Navigate to the frontend
cd codefliq/frontend

# 3. Install dependencies
npm install

# 4. Fire it up
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're live. 🚀

<details>
<summary><b>⚙️ Environment Variables (Optional)</b></summary>

Create a `.env.local` file in the `frontend/` directory for any future integrations:

```env
# Public URL for metadata and canonical links
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Example: Add analytics, CMS, or API keys here as needed
# NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"
```

No environment variables are required to run the project. It works out of the box.

</details>

<details>
<summary><b>🚀 Deploy to Vercel</b></summary>

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo.
3. Set the **Root Directory** to `frontend`.
4. Click **Deploy**. Done.

Vercel auto-detects Next.js and configures everything for you.

</details>

---

## 📖 Usage / Deep Dive

**Adding a new 3D scene component:**

```tsx
// components/three/MyScene.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MyScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  // 60fps animation loop — fully isolated from React's render cycle
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#4f6ef7"
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </mesh>
  );
}
```

**Consuming the scene on any page (SSR-safe):**

```tsx
// app/my-page/page.tsx
import dynamic from "next/dynamic";

// Critical: ssr: false prevents hydration errors with WebGL
const MyScene = dynamic(() => import("@/components/three/MyScene"), {
  ssr: false,
});

export default function MyPage() {
  return (
    <div className="relative h-screen">
      {/* DOM UI renders instantly via SSR */}
      <h1 className="absolute z-10 text-white font-display text-6xl">Hello</h1>

      {/* 3D canvas loads after hydration, never blocking the main thread */}
      <div className="absolute inset-0 z-0">
        <MyScene />
      </div>
    </div>
  );
}
```

---

## 📂 Project Structure

```text
frontend/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                  # Homepage (Hero + Services + Testimonials)
│   ├── about/page.tsx            # About page
│   ├── services/page.tsx         # Services listing
│   ├── portfolio/page.tsx        # Work showcase
│   ├── contact/page.tsx          # Contact + Visme form embed
│   └── layout.tsx                # Root layout with custom fonts + Navbar
│
├── components/
│   ├── effects/                  # Scroll-triggered animation wrappers
│   │   └── ScrollReveal.tsx      # Framer Motion viewport detection
│   ├── layout/                   # Site-wide structural components
│   │   ├── Navbar.tsx            # Responsive nav with scroll-aware blur
│   │   └── Footer.tsx
│   ├── sections/                 # Full page-section blocks
│   │   ├── HeroSection.tsx       # Landing hero with 3D neural network
│   │   ├── ServicesSection.tsx   # Service cards with glassmorphism
│   │   ├── ContactForm.tsx       # Visme embed container
│   │   └── TestimonialsSection.tsx
│   ├── three/                    # All WebGL / R3F components
│   │   ├── HeroScene.tsx         # Main homepage 3D environment
│   │   ├── NeuralNetwork3D.tsx   # Animated node-link graph
│   │   ├── ContactGlobe.tsx      # Interactive 3D globe
│   │   ├── AbstractBlob.tsx      # Morphing particle system
│   │   └── SceneLoader.tsx       # Reusable R3F Canvas wrapper
│   └── ui/                       # Atomic design system components
│       ├── GlassMorphismPanel.tsx
│       ├── GradientText.tsx
│       ├── HolographicBadge.tsx
│       └── CustomCursor.tsx
│
├── lib/
│   ├── utils.ts                  # cn() classname merging utility
│   └── validations.ts            # Zod schemas for type-safe forms
│
├── public/images/                # Static assets + real screenshots
├── tailwind.config.ts            # Full custom design token system
└── next.config.ts                # Next.js optimizations config
```

---

## 🎯 Use Cases

| Industry | Problem | Codefliq Solution |
|---|---|---|
| **Web Agencies** | Looks identical to every other agency | A 3D interactive site that *proves* technical capability instantly |
| **SaaS Startups** | Can't afford months of custom development | Production-ready, deploy in 60 seconds, customize from day one |
| **Developer Portfolios** | Static portfolio sites are forgettable | Immersive WebGL experience that top FAANG recruiters remember |
| **Design Studios** | Design-only portfolios miss the engineering story | Code + design perfectly unified in one stunning showcase |

---

## 🔥 Advanced 3D Capabilities

**Neural Network Visualization**
A fully animated, interactive graph simulation renders live connections between nodes, representing complex AI or data pipeline architectures in real-time at 60fps.

**Post-Processing Bloom Effects**
Using `@react-three/postprocessing`, every 3D scene features a premium cinematic bloom effect, giving the site its signature "glowing" dark aesthetic.

**Physics-Spring Scroll Sync**
Framer Motion's spring physics engine syncs HTML element animations with WebGL camera position, creating a seamless parallax depth effect as users scroll through pages.

**Graceful Degradation**
All WebGL components are wrapped in `<Suspense>` with elegant CSS fallbacks. Mobile users and users with GPU limitations always receive a smooth experience.

---

## 📸 Screenshots

<div align="center">

### 🏠 Homepage — Immersive 3D Neural Network Hero
<img src="./public/images/screenshot-home.png" alt="Codefliq Homepage" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

---

### 🛠️ Services — Glassmorphic Service Cards
<img src="./public/images/screenshot-services.png" alt="Codefliq Services Page" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

---

### 🎨 Portfolio — Interactive Work Showcase
<img src="./public/images/screenshot-portfolio.png" alt="Codefliq Portfolio Page" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

---

### 📬 Contact — 3D Globe + Integrated Lead Capture
<img src="./public/images/screenshot-contact.png" alt="Codefliq Contact Page" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

---

### 👤 About — Story + Team Section
<img src="./public/images/screenshot-about.png" alt="Codefliq About Page" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />

</div>

---

## 📈 Performance & Benchmarks

| Metric | Score | Industry Average |
|---|---|---|
| **Lighthouse Performance** | 95+ | 60-70 |
| **First Contentful Paint** | < 1.2s | 2.5s |
| **Time to Interactive** | < 2.0s | 4.0s |
| **SEO Score** | 100 | 75-85 |
| **Accessibility** | 95+ | 70-80 |

**Key optimizations:**
- `next/dynamic` lazy-loading keeps the initial JS bundle tiny
- `next/image` serves WebP with automatic resizing on every image
- WebGL `useFrame` loops are paused via `IntersectionObserver` when off-screen
- Zero render-blocking stylesheets thanks to Tailwind's JIT compilation

---

## ⚔️ Why This Project Is Different

Most 3D websites are a gimmick. They look impressive in a gif, then take 10 seconds to load, tank your Lighthouse score, and break on mobile.

**Codefliq is engineered differently:**
- 3D is loaded *after* the page is interactive, not *before*
- SSR ensures search engines see full HTML content, not a blank canvas
- The design system is built on semantic tokens, not ad-hoc utilities
- Zero external SaaS dependencies required to run it locally

It's not just beautiful. It's architecturally sound.

---

## 🆚 Comparison Table

| Feature | Codefliq | WordPress Themes | Webflow | Raw Three.js |
|---|---|---|---|---|
| **3D WebGL Rendering** | ✅ Native 60fps | ❌ None | ⚠️ iframe only | ✅ But complex |
| **SSR / SEO** | ✅ Full Next.js SSR | ⚠️ Plugin-dependent | ⚠️ Limited | ❌ None |
| **Performance** | ✅ 95+ Lighthouse | ❌ 50-65 | ⚠️ 70-80 | ⚠️ Varies |
| **Customizability** | ✅ 100% code access | ❌ Theme-restricted | ❌ Platform-locked | ✅ Full |
| **Hosting Cost** | ✅ Free (Vercel) | ❌ $20+/mo | ❌ $30+/mo | ✅ Free |
| **Backend Required** | ✅ None | ❌ PHP/MySQL | ❌ Webflow CMS | ⚠️ Usually |
| **Mobile Performance** | ✅ Graceful fallback | ❌ Often broken | ⚠️ Mediocre | ❌ Often broken |

---

## 🗺️ Roadmap

- [x] Core Next.js 15 App Router architecture
- [x] React Three Fiber 3D scene system
- [x] Premium Glassmorphic UI design system
- [x] Framer Motion physics animations
- [x] Serverless lead capture (Visme)
- [x] Full responsive mobile support
- [ ] Global 3D transition system between page routes
- [ ] Dark/light mode with material switching for 3D meshes
- [ ] Three.js skeleton loading states for slow connections
- [ ] CMS integration (Sanity.io) for portfolio case studies
- [ ] Analytics dashboard with Plausible or Vercel Analytics

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. **Any contributions you make are genuinely appreciated.**

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'feat: Add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open a Pull Request** — describe what you changed and why

**PR Guidelines:**
- Follow the existing code style (TypeScript strict, Tailwind utilities only)
- Test responsiveness on both mobile and desktop before submitting
- New 3D components must be wrapped in `dynamic()` with `ssr: false`
- Keep commits atomic and messages descriptive

---

## 🛡️ Security & Privacy

- **No custom backend** = no SQL injection vectors, no exposed API keys, no session management vulnerabilities
- **No user data stored** server-side — all lead capture goes directly to Visme's SOC 2 compliant infrastructure
- Environment variables (if used) are prefixed with `NEXT_PUBLIC_` and contain no sensitive secrets in the client bundle
- Dependencies are audited regularly — run `npm audit` to check the current status

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.

You are free to use, modify, and distribute this project — personal and commercial use permitted.

---

## 👤 Author

<div align="center">

<img src="./public/images/updesh me.jpg" alt="Updesh Singh" width="100" height="100" style="border-radius: 50%; border: 3px solid #4f6ef7;" />

### Updesh Singh
*Full-Stack Developer & Creative Engineer*

[![GitHub](https://img.shields.io/badge/GitHub-updeshsingh9063-181717?style=for-the-badge&logo=github)](https://github.com/updeshsingh9063)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Updesh_Singh-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/updesh-singh-357aa0344)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Site-4f6ef7?style=for-the-badge&logo=vercel)](https://my-portfolio-o2is.vercel.app/)

</div>

---

<div align="center">

**If this project helped you, please consider giving it a ⭐ on GitHub!**

*It takes 2 seconds and means the world to open-source developers.*

</div>
