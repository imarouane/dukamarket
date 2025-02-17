/** @type {import('tailwindcss').Config} */

import forms from '@tailwindcss/forms'
import aspect_ration from '@tailwindcss/aspect-ratio'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif']
      },
      colors: {
        'yellow-primary': '#fcbe00'
      },
      keyframes: {
        'fade-in-down': {
          from: {
            transform: 'translateY(-0.75rem)',
            opacity: '0'
          },
          to: {
            transform: 'translateY(0rem)',
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both'
      }
    }
  },
  plugins: [forms, aspect_ration]
}
