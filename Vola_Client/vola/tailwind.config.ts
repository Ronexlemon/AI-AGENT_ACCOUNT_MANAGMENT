import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "trade-dark": "#0A051E",
        "trade-card": "#0F0A2A",
        "trade-border": "#2A2456",
        "trade-accent": "#4E5FFF",
        "trade-success": "#00FF95",
        "trade-error": "#FF3B3B",
      },
    },
  },
  plugins: [],
} satisfies Config;
