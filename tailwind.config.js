/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#FFFFFF',
        light: {
          400: '#EDF0F5',
          500: '#C1C9D6',
          600: '#9AA5B8',
        },
        black: '#000000',
        dark: {
          400: '#1E1D2B',
          500: '#252736',
          600: '#2F3042',
        },
        primary: {
          400: '#34d399',
          500: '#10B981',
          600: '#10B981',
        },
        success: {
          400: '#4ADE80',
          500: '#22C55E',
          600: '#15803D',
        },
        warning: {
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        alert: {
          400: '#E11D48',
          500: '#BE123C',
          600: '#9F1239',
        },
      },
    },
  },
  plugins: [],
}

