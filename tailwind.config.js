/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    screens: {
      'md': '750px',
      // => @media (min-width: 640px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lx': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        "poppins":["poppins","sans-serif"],
        "jura":["jura","sans-serif"],
        "kanit":["kanit","sans-serif"],
      },
      colors:{
        "orange":"#FFAA17",
        "orange-light":"#F9C468",
        "orange-dark":"#875C00",
      }
    },
  },
  plugins: [
    // flowbite
    require('flowbite/plugin'),
  ],
}

