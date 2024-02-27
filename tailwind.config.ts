/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', '0.875rem'],
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.25rem', '1.5625rem'],
      xl: ['1.5rem', '1.875rem'],
      '2xl': ['2rem', '2.5rem'],
      '3xl': ['2.5rem', '3.125rem'],
      '4xl': ['3rem', '3.625rem'],
      '5xl': ['3.5rem', '4.1875rem'],
    },
    fontFamily: {
      head: ['"Exo 2"', 'sans-serif'],
      body: ['"Exo 2"', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
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
        400: '#89E774',
        500: '#4AD42B',
        600: '#66BE52',
      },
      success: {
        400: '#89E774',
        500: '#4AD42B',
        600: '#66BE52',
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
}

