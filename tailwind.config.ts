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
        paper: "#FFFFFF",
        "paper-deep": "#F5F5F4",
        ink: "#1A1714",
        "ink-soft": "#3D342E",
        quiet: "#7A6E63",
        accent: "#8B3A2F",
        rule: "#E5E5E5",
        "footer-top": "#1f1f1f",
        "footer-mid": "#161616",
        "footer-bottom": "#0e0e0e",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.06", letterSpacing: "-0.012em" }],
        section: ["2rem", { lineHeight: "1.15", letterSpacing: "-0.006em" }],
        subtitle: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.002em" }],
        body: ["1rem", { lineHeight: "1.55" }],
        meta: ["0.75rem", { lineHeight: "1.45", letterSpacing: "0.04em" }],
      },
      maxWidth: {
        reading: "640px",
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
