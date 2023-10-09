/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gridTemplateRows: {
          layout: "10vh 80vh 10vh",
        },
        gridTemplateColumns: {
          layout: "25% 75%",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
