/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["DM Sans", "sans-serif"],
        quantity: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#2563eb",
        "on-primary": "#ffffff",

        error: "#e11d48",
        "error-container": "#fff1f2",
        "on-error": "#ffffff",
        "on-error-container": "#881337",

        background: "#f8fafc",
        "on-surface": "#1e293b",
        "on-surface-variant": "#64748b",
        "surface-container-low": "#ffffff",
        "surface-container": "#ffffff",
        "surface-variant": "#f1f5f9",
        outline: "#cbd5e1",

        "stock-low": "#e11d48",
        "stock-mid": "#d97706",
        "stock-high": "#10b981",
      },
    },
  },
  plugins: [],
};
