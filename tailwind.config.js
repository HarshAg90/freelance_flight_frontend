/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        MrsSheppards: ["Mrs Sheppards", "cursive"],
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
