import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#081915',
          900: '#0f2b24',
          800: '#1d443a',
        },
        cream: {
          50: '#fffaf0',
          100: '#f7ecd4',
          200: '#ebd7ad',
        },
        gold: {
          400: '#e3c173',
          500: '#d4a144',
          600: '#bb812d',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 55px rgba(212, 161, 68, 0.28)',
        card: '0 24px 46px rgba(6, 19, 16, 0.34)',
        soft: '0 16px 32px rgba(8, 25, 21, 0.18)',
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
