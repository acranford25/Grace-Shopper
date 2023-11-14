/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "tw-",
  important: true,
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
      animation: {
        animate1: "transform 250ms linear",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        bold: "0px 15px 20px rgba(0, 0, 0, 0.2)",
        sleek: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        good: "0px 3px 8px rgba(0, 0, 0, 0.24)",
        raised:
          "inset 0px 1px 1px 0px rgba(255, 255, 255, 0.1), 0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px rgba(0, 0, 0, 0.3)",
        aesthetic:
          "0 3px 7px 0 rgba(0, 0, 0, .13), 0 1px 2px 0 rgba(0, 0, 0, .11)",
        layered_modern:
          "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.07)",
        inner_lg: "inset 0 0 10px #E11645",
        inset_el:
          "0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0px -2px 6px 0px rgba(10, 37, 64, 0.35)",
        1: "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
        2: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        button:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        all: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45), 0px 25px 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        tb: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), 0px 25px 20px -20px rgba(0, 0, 0, 0.45)",
        tbl: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), 0px 25px 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        tbr: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), 0px 25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        bl: "0px 25px 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        "2bl":
          "0px 35px 40px -25px rgba(0, 0, 0, 0.45), -35px 0 40px -25px rgba(0, 0, 0, 0.45)",
        br: "0px 25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        "2br":
          "0px 35px 40px -25px rgba(0, 0, 0, 0.45), 35px 0 40px -25px rgba(0, 0, 0, 0.45)",
        blr: "0px 25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        "2blr":
          "0px 35px 40px -25px rgba(0, 0, 0, 0.45), 35px 0 40px -25px rgba(0, 0, 0, 0.45), -35px 0 40px -25px rgba(0, 0, 0, 0.45)",
        b: "0px 25px 20px -20px rgba(0, 0, 0, 0.45)",
        t: "0px -25px 20px -20px rgba(0, 0, 0, 0.45)",
        tl: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        tr: "0px -25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        rl: "25px 0 20px -20px rgba(0, 0, 0, 0.45), -25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        l: "-25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        r: "25px 0 20px -20px rgba(0, 0, 0, 0.45)",
        "3D": "0px 1px 0px 0px rgba(0,0,0,0.22), 1px 0px 0px 0px rgba(0,0,0,0.22), 1px 2px 0px 0px rgba(0,0,0,0.22), 2px 1px 0px 0px rgba(0,0,0,0.22), 2px 3px 0px 0px rgba(0,0,0,0.22), 3px 2px 0px 0px rgba(0,0,0,0.22), 3px 4px 0px 0px rgba(0,0,0,0.22), 4px 3px 0px 0px rgba(0,0,0,0.22), 4px 5px 0px 0px rgba(0,0,0,0.22), 5px 4px 0px 0px rgba(0,0,0,0.22), 5px 6px 0px 0px rgba(0,0,0,0.22), 6px 5px 0px 0px rgba(0,0,0,0.22), 6px 7px 0px 0px rgba(0,0,0,0.22), 7px 6px 0px 0px rgba(0,0,0,0.22), 7px 8px 0px 0px rgba(0,0,0,0.22), 8px 7px 0px 0px rgba(0,0,0,0.22)",
        level_1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        level_2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        level_3: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        level_4: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        level_5: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        level_6: "0 29px 52px rgba(0,0,0,0.40), 0 25px 16px rgba(0,0,0,0.20)",
        level_7: "0 45px 65px rgba(0,0,0,0.50), 0 35px 22px rgba(0,0,0,0.16)",
        level_8: "0 60px 80px rgba(0,0,0,0.60), 0 45px 26px rgba(0,0,0,0.14)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animate"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
