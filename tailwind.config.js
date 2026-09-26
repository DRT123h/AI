/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      colors: {
        verdia: {
          bg: "#150a29",
          card: "#211342",
          border: "rgba(255,255,255,0.08)",
        },
      },
      backgroundImage: {
        "verdia-gradient": "linear-gradient(160deg, #150a29, #2c1a54)",
        "verdia-accent": "linear-gradient(90deg, #00bfa7, #00fa5a)",
      },
    },
  },
  plugins: [],
};
