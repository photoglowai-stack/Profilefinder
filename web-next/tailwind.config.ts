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
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
