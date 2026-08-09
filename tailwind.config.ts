import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#090909",
          card: "#111111",
          surface: "#181818",
          "surface-light": "#242424",
          cream: "#FFF7ED",
          red: "#E53935",
          "red-hover": "#D32F2F",
          orange: "#FF6B35",
          yellow: "#FFC857",
          white: "#FFFFFF",
          muted: "#A1A1AA",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.2)",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px -5px rgba(229, 57, 53, 0.3)",
        "glow-orange": "0 0 30px -5px rgba(255, 107, 53, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
