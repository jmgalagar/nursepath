/** @type {import('tailwindcss').Config} */
// NursePath design tokens — medical theme from the spec.
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Medical Blue
        primary: {
          DEFAULT: "#2A7FFF",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2A7FFF",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        // Secondary Teal
        secondary: {
          DEFAULT: "#00BFA6",
          50: "#effdfa",
          100: "#c7f7ee",
          200: "#90eee0",
          300: "#54e0cf",
          400: "#1fcdbe",
          500: "#00BFA6",
          600: "#009e8a",
          700: "#007e6e",
          800: "#005f54",
          900: "#00403a",
        },
        // Accent Red (for alerts / urgent)
        alert: {
          DEFAULT: "#E53935",
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#E53935",
          700: "#b91c1c",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
        "card-hover":
          "0 10px 25px -5px rgb(42 127 255 / 0.15), 0 8px 10px -6px rgb(42 127 255 / 0.1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { transform: "scale(0.9)" },
          "60%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        pop: "pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
