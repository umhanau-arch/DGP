/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9eeff",
          200: "#bce0ff",
          300: "#8ecbff",
          400: "#59afff",
          500: "#2f93ff",
          600: "#1577f0",
          700: "#1361d1",
          800: "#1551a8",
          900: "#174784",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)",
        card: "0 4px 14px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
