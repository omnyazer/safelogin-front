/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        slateBrand: {
          950: '#0b1220',
          900: '#111a2d',
          800: '#1a2842',
          700: '#2a3f66',
          100: '#e6eefb',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(11, 18, 32, 0.14)',
      },
    },
  },
  plugins: [],
};
