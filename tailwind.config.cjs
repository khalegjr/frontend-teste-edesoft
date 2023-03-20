/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-600": "#222",
        "dark-200": "#575757",
        "dark-100": "#6d6d6d",
        "blue-600": "#05088A",
        "blue-700": "#05055B",
        "yellow-600": "#f9d13e",
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1125px",
          xl: "1125px",
          "2xl": "1125px",
          "3xl": "1500px",
        },
      },
    },
  },
  plugins: [],
}
