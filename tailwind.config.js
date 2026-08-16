/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F6F8FC",
        primary: {
          DEFAULT: "#3155E7",
          dark: "#2544C4",
        },
        ai: {
          DEFAULT: "#6C63FF",
        },
        navy: "#172033",
        muted: "#667085",
        success: "#16B364",
        warning: "#F79009",
        danger: "#F04438",
        border: "#E7EAF0",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(23, 32, 51, 0.04), 0 1px 8px rgba(23, 32, 51, 0.04)",
        "card-hover": "0 4px 16px rgba(23, 32, 51, 0.08)",
        hero: "0 20px 50px -12px rgba(17, 25, 54, 0.35)",
      },
      borderRadius: {
        xl2: "14px",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        scan: "scan 2s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        fadeSlideUp: "fadeSlideUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
