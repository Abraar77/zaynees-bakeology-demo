import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#090910',
          900: '#121221',
          800: '#1c1b2c',
        },
        cream: {
          50: '#ffffff',
          100: '#f5f6fb',
          200: '#e4e7f2',
        },
        gold: {
          400: '#ff52b4',
          500: '#ff0b8d',
          600: '#d70073',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 55px rgba(255, 11, 141, 0.34)',
        card: '0 20px 38px rgba(17, 18, 33, 0.18)',
        soft: '0 12px 28px rgba(17, 18, 33, 0.14)',
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
        slowPulse: {
          '0%, 100%': { opacity: 0.65 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 700ms ease-out both',
        shimmer: 'shimmer 2.6s linear infinite',
        slowPulse: 'slowPulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [forms],
}
