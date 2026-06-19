/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "Inter", "sans-serif"],
        quantity: ["Manrope", "Inter", "sans-serif"],
      },
      colors: {
        primary: "#2196f3",
        "on-primary": "#ffffff",

        error: "#dc2626",
        "error-container": "#fef2f2",
        "on-error": "#ffffff",
        "on-error-container": "#7f1d1d",

        background: "#fef7ff",
        "on-surface": "#1c1b1f",
        "on-surface-variant": "#49454f",
        "surface-container-low": "#f7f1fa",
        "surface-container": "#f1eaf5",
        "surface-variant": "#f7f1fa",
        outline: "#79747e",

        "stock-low": "#ef4444",
        "stock-mid": "#f59e0b",
        "stock-high": "#22c55e",
      },
    },
  },
  plugins: [],
};
