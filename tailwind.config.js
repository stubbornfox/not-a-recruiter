/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss')
const colors = require('tailwindcss/colors')
const formTailwind = require('@tailwindcss/forms')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,ts}"],
  theme: {
    extend: {
      maxWidth: {
        'sidebar': '12rem',
      },
      padding: {
        'sidebar': '17rem',
      },
      fontFamily: {
        inter: [
          "Inter var, sans-serif",
          { fontFeatureSettings: '"cv11", "ss01"' },
        ],
      },
      colors: {
        blue: '#26A4FF',
        purple: '#7B61FF',
        'neutrals-10i': '#E8E8E8',
        'primary': '#7330DF',
        'secondary': '#C7ACF2',
        'tertiary': '#F1EAFC',
        'red': '#FF6550',
        'yellow': '#FFB836',
        'light-blue': '#E9EBFD',
        'green': '#56CDAD',
        'neutrals': {
          0: '#F8F8FD',
          10: '#F9FAFC',
          20: '#E4E5E7',
          40: '#A8ADB7',
          60: '#7C8493',
          80: '#515B6F',
          100: '#25324B',
        },
      },
    }
  },
  important: true,
  plugins: [formKitTailwind, formTailwind, plugin(function({ addBase, theme }) {
    addBase({
      'h1': { fontSize: theme('fontSize.2xl') },
      'h2': { fontSize: theme('fontSize.xl') },
      'h3': { fontSize: theme('fontSize.lg') },
      'h4': { fontSize: theme('fontSize.md') },
      'h5': { fontSize: theme('fontSize.sm') },
      'h6': { fontSize: theme('fontSize.xs') },
    })
  })],
}
