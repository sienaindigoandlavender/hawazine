import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#FFFFFF",
        quiet: "#6B6B6B",
        accent: "#1B2A4E",
        "footer-top": "#1f1f1f",
        "footer-mid": "#161616",
        "footer-bottom": "#0e0e0e",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        section: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
        subtitle: ["1.375rem", { lineHeight: "1.35" }],
        body: ["1.125rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.45", letterSpacing: "0.02em" }],
      },
      maxWidth: {
        reading: "680px",
        page: "1200px",
      },
      spacing: {
        rail: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
