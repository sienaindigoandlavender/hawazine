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
        ink: "#1A1714",
        "ink-soft": "#3D342E",
        quiet: "#7A6E63",
        accent: "#8B3A2F",
        rule: "#E8E8E6",
        "footer-top": "#1f1f1f",
        "footer-mid": "#161616",
        "footer-bottom": "#0e0e0e",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        section: ["2.5rem", { lineHeight: "1.12", letterSpacing: "-0.008em" }],
        subtitle: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.003em" }],
        body: ["1.125rem", { lineHeight: "1.65" }],
        meta: ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.04em" }],
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
