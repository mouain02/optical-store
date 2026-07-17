/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Bebas Neue"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary, #1a1a1a)",
        accent: "var(--color-accent, #c4a574)",
        promo: "var(--color-promo, #2d2d2d)",
      },
      transitionDuration: {
        120: "120ms",
      },
    },
  },
  plugins: [],
};
