/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [forms]
}
