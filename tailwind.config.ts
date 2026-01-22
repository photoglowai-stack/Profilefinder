import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#ff4e71",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ff7f66",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        'brand-gradient': "linear-gradient(to right, #ff4e71, #ff7f66, #ff4e71dd)",
        "hero-dating": "radial-gradient(ellipse 150% 80% at 50% 20%, #FF5E00 0%, #FF085E 35%, #FF004F 60%, #E8003D 100%)",
        "hero-following": "radial-gradient(ellipse 150% 80% at 50% 20%, #9333EA 0%, #7C3AED 35%, #6D28D9 60%, #5B21B6 100%)",
        "hero-facetrace": "radial-gradient(ellipse 150% 80% at 50% 20%, #06B6D4 0%, #0EA5E9 35%, #0284C7 60%, #0369A1 100%)",
        "hero-fidelity": "radial-gradient(ellipse 150% 80% at 50% 20%, #F472B6 0%, #EC4899 35%, #DB2777 60%, #BE185D 100%)",
        "hero-bottom-fade": "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.9) 85%, #ffffff 100%)",
        "hero-cta-dating": "linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #ef4444 100%)",
        "hero-cta-following": "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%)",
        "hero-cta-facetrace": "linear-gradient(135deg, #075985 0%, #0284c7 50%, #0ea5e9 100%)",
        "hero-cta-fidelity": "linear-gradient(135deg, #9d174d 0%, #be185d 50%, #db2777 100%)",
        "hero-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
