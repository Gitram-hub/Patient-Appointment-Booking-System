/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          50: '#effdf6',
          100: '#d8f8e6',
          200: '#b2efd0',
          300: '#82e0b3',
          400: '#4ac88f',
          500: '#20a56e',
          600: '#17805a',
          700: '#135f46',
          800: '#124a39',
          900: '#0e3a2d'
        }
      },
      boxShadow: {
        soft: '0 24px 60px rgba(7, 17, 29, 0.14)'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(32, 165, 110, 0.18), transparent 35%), radial-gradient(circle at top right, rgba(15, 23, 42, 0.08), transparent 30%)'
      }
    }
  },
  plugins: []
};