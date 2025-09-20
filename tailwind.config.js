/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Material Design 3 Primary Colors
        primary: "#2196f3",
        "primary-50": "#e3f2fd",
        "primary-100": "#bbdefb",
        "primary-200": "#90caf9",
        "primary-300": "#64b5f6",
        "primary-400": "#42a5f5",
        "primary-500": "#2196f3",
        "primary-600": "#1e88e5",
        "primary-700": "#1976d2",
        "primary-800": "#1565c0",
        "primary-900": "#0d47a1",
        "primary-container": "#e3f2fd",
        "on-primary": "#ffffff",
        "on-primary-container": "#001b3d",

        // Secondary Colors
        secondary: "#9c27b0",
        "secondary-50": "#f3e5f5",
        "secondary-100": "#e1bee7",
        "secondary-200": "#ce93d8",
        "secondary-300": "#ba68c8",
        "secondary-400": "#ab47bc",
        "secondary-500": "#9c27b0",
        "secondary-600": "#8e24aa",
        "secondary-700": "#7b1fa2",
        "secondary-800": "#6a1b9a",
        "secondary-900": "#4a148c",
        "secondary-container": "#f3e5f5",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#4a148c",

        // Tertiary Colors
        tertiary: "#f77b00",
        "tertiary-50": "#fef7ed",
        "tertiary-100": "#feead0",
        "tertiary-200": "#fdd5a0",
        "tertiary-300": "#fcbb6f",
        "tertiary-400": "#fba23e",
        "tertiary-500": "#fa8a0c",
        "tertiary-600": "#f77b00",
        "tertiary-700": "#e86800",
        "tertiary-800": "#d55600",
        "tertiary-900": "#be4200",
        "tertiary-container": "#fef7ed",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#5c2800",

        // Error Colors
        error: "#dc2626",
        "error-50": "#fef2f2",
        "error-100": "#fee2e2",
        "error-200": "#fecaca",
        "error-300": "#fca5a5",
        "error-400": "#f87171",
        "error-500": "#ef4444",
        "error-600": "#dc2626",
        "error-700": "#b91c1c",
        "error-800": "#991b1b",
        "error-900": "#7f1d1d",
        "error-container": "#fef2f2",
        "on-error": "#ffffff",
        "on-error-container": "#7f1d1d",

        // Surface Colors
        surface: "#fef7ff",
        "surface-dim": "#ddd9e1",
        "surface-bright": "#faf4fe",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f1fa",
        "surface-container": "#f1eaf5",
        "surface-container-high": "#ebe4f0",
        "surface-container-highest": "#e5dee9",
        "surface-variant": "#f7f1fa",

        // Text Colors
        "on-surface": "#1c1b1f",
        "on-surface-variant": "#49454f",
        "on-background": "#1c1b1f",

        // Outline Colors
        outline: "#79747e",
        "outline-variant": "#c4c0c9",

        // Background
        background: "#fef7ff",

        // Inverse Colors
        "inverse-surface": "#313033",
        "inverse-on-surface": "#e5dee9",
        "inverse-primary": "#b8c4ff",
      },
    },
  },
  plugins: [],
};
