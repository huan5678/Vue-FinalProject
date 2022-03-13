const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '0.9375rem',
      },
      fontFamily: {
        sans: ['Noto Sans TC', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#fffaf3',
          100: '#fef5e7',
          200: '#fde7c4',
          300: '#fbd9a1',
          400: '#f8bc5a',
          500: '#f59f13',
          600: '#dd8f11',
          700: '#b8770e',
          800: '#935f0b',
          900: '#784e09',
        },
        secondary: {
          50: '#f4f4f6',
          100: '#eaeaed',
          200: '#cacad2',
          300: '#aaabb7',
          400: '#6a6b81',
          500: '#2a2c4b',
          600: '#262844',
          700: '#202138',
          800: '#191a2d',
          900: '#151625',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1366px',
          },
        },
      });
    },
  ],
};
