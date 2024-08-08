/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cardgrey: "rgba(240, 240, 240, 0.5)",
      },
      fontSize: {
        customBase: "16px",
      },
    },
  },
  plugins: [],
};
