/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */

const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        5000: '5s',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.list-col-1': {
          columnCount: 1,
        },
        '.list-col-2': {
          columnCount: 2,
        },
        '.list-col-3': {
          columnCount: 3,
        },
        '.list-col-4': {
          columnCount: 4,
        },
        '.list-col-5': {
          columnCount: 5,
        },
      };

      addUtilities(newUtilities, ['responsive']);
    }),
  ],
};
