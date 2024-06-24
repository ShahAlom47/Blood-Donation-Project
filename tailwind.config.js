/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-p': '#ea062b',
        'color-text': '#111111',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

