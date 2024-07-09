/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      cusT:["Roboto Condensed","sans-serif"]
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "base-100": "#ffffff",
          primary: "#7541f1ff",
          secondary: "#FEFFFEff",

          accent: "#FFC735",
          neutral: "#1B1B1Cff",
          "bb-t": "#FFC735",

          info: "#3747F9",

          success: "#a3e635",

          warning: "#fde047",

          error: "#F84E79",
          
        },

        mythemedark: {
          "base-100": "#ffffff",
          primary: "#070F2B",
          secondary: "#EEEEEE",

          accent: "#FAF0E6",
          neutral: "#1B1B1Cff",
          "bb-t": "#FFC735",

          info: "#222831",

          success: "#a3e635",

          warning: "#fde047",

          error: "#A0153E",
        },
      },
      "light",
      "dark",
      "dracula",
    ],
  },
};
