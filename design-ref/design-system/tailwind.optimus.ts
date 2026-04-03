/**
 * OPTIMUS DESIGN SYSTEM - Tailwind Configuration
 * Extracted from: https://v0-optimus-delta.vercel.app/
 *
 * Usage: Import and spread into your tailwind.config.ts
 *
 * import { optimusTheme } from './design-system/tailwind.optimus'
 * export default { theme: { extend: optimusTheme } }
 */

import type { Config } from "tailwindcss"

export const optimusTheme = {
  colors: {
    // Brand
    dark: "#0A0A0A",
    accent: {
      DEFAULT: "#10B981",
      muted: "rgba(16, 185, 129, 0.1)",
    },

    // Extended neutrals (supplement default gray)
    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0A0A0A",
    },
  },

  fontFamily: {
    sans: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ],
    mono: [
      "JetBrains Mono",
      "Fira Code",
      "SF Mono",
      "Consolas",
      "monospace",
    ],
  },

  fontSize: {
    // Custom fluid sizes
    "hero": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
    "section": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
    "card-title": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
    "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  },

  boxShadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
  },

  spacing: {
    // Additional spacing values
    "4.5": "1.125rem",
    "18": "4.5rem",
    "22": "5.5rem",
  },

  maxWidth: {
    container: "1280px",
  },

  transitionDuration: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
  },

  animation: {
    grain: "grain 8s steps(10) infinite",
    "marquee-left": "marquee-left 30s linear infinite",
    "marquee-right": "marquee-right 30s linear infinite",
  },

  keyframes: {
    grain: {
      "0%, 100%": { transform: "translate(0, 0)" },
      "10%": { transform: "translate(-5%, -10%)" },
      "20%": { transform: "translate(-15%, 5%)" },
      "30%": { transform: "translate(7%, -25%)" },
      "40%": { transform: "translate(-5%, 25%)" },
      "50%": { transform: "translate(-15%, 10%)" },
      "60%": { transform: "translate(15%, 0%)" },
      "70%": { transform: "translate(0%, 15%)" },
      "80%": { transform: "translate(3%, 35%)" },
      "90%": { transform: "translate(-10%, 10%)" },
    },
    "marquee-left": {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
    "marquee-right": {
      "0%": { transform: "translateX(-50%)" },
      "100%": { transform: "translateX(0)" },
    },
  },
}

/* ============================================
   13. RESPONSIVE BREAKPOINTS
   ============================================ */

export const optimusScreens = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

/* ============================================
   FULL TAILWIND CONFIG EXPORT
   ============================================ */

export const optimusConfig: Partial<Config> = {
  theme: {
    screens: optimusScreens,
    extend: optimusTheme,
  },
}

export default optimusConfig
