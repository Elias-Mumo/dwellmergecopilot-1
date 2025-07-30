import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F28C42",
          50: "#fef7f0",
          100: "#fdede0",
          200: "#fad7c1",
          300: "#f7b896",
          400: "#f28c42",
          500: "#ef7428",
          600: "#e0601e",
          700: "#ba4b1c",
          800: "#943e1d",
          900: "#77341b",
          950: "#40190d",
        },
        secondary: {
          DEFAULT: "#537895",
          50: "#f4f7fa",
          100: "#e6eef4",
          200: "#d2e0eb",
          300: "#b2cadd",
          400: "#8caecb",
          500: "#537895",
          600: "#5e7fa1",
          700: "#52708a",
          800: "#475e72",
          900: "#3e4f5f",
          950: "#29333e",
        },
        background: "#FCF9F3",
        foreground: "#2B2B2B",
        muted: {
          DEFAULT: "#A0A397",
          foreground: "#6b7280",
        },
        border: "#A0A397",
        input: "#A0A397",
        ring: "#F28C42",
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#fef2f2",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
