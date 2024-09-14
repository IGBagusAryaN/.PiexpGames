/** @type {import('tailwindcss').Config} */
export default {
  purge: [],
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin')({
          datatables: true,
      }),
  ]
  }
