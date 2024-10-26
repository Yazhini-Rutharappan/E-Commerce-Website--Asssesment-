const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors: {
      'voguish-brown': '#7D6757', // Custom color for Voguish Trends
    },
  },
  plugins: [flowbite.content(),],
}