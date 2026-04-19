import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#14100f',
          900: '#1c1614',
          800: '#2b201d',
        },
        cream: {
          50: '#fcf8ef',
          100: '#f6efdf',
          200: '#ead8b5',
        },
        gold: {
          400: '#d6b466',
          500: '#c79a3f',
          600: '#ad7e29',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 15px 45px rgba(199, 154, 63, 0.18)',
        card: '0 20px 40px rgba(0, 0, 0, 0.28)',
        soft: '0 14px 30px rgba(20, 16, 15, 0.16)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 700ms ease-out both',
        shimmer: 'shimmer 2.6s linear infinite',
      },
    },
  },
  plugins: [forms],
}
