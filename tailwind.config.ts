import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        bg: {
          primary: "#0a0a0f",
          secondary: "#0f0f1a",
          card: "#141428",
          elevated: "#1a1a32",
        },
        // Accents
        accent: {
          blue: "#4f6ef7",
          purple: "#7c5cfc",
          teal: "#00e5c3",
        },
        // Text
        text: {
          primary: "#e8e8f0",
          muted: "#8888aa",
          faint: "#4a4a6a",
        },
        // Borders
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          hover: "rgba(255,255,255,0.15)",
          accent: "rgba(79,110,247,0.4)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #4f6ef7, #7c5cfc)",
        "gradient-teal": "linear-gradient(135deg, #00e5c3, #4f6ef7)",
        "gradient-radial-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79,110,247,0.25) 0%, transparent 70%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(79,110,247,0.08), rgba(124,92,252,0.04))",
        "gradient-border":
          "linear-gradient(135deg, rgba(79,110,247,0.5), rgba(124,92,252,0.5))",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(79,110,247,0.3)",
        "glow-purple": "0 0 40px rgba(124,92,252,0.3)",
        "glow-teal": "0 0 30px rgba(0,229,195,0.25)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(79,110,247,0.2)",
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
