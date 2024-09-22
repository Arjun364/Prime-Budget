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
        "poppins":["poppins","sans-serif"]
      },
    },
  },
  plugins: [
    // flowbite
    require('flowbite/plugin'),
  ],
}

