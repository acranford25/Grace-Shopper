/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html, js, jsx}, ./components/**/*.{html, js, jsx}",
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
