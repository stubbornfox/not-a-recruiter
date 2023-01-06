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
      colors: {
        blue: colors.blue,
        'mute': 'var(--color-background-mute)',
        'soft': 'var(--color-background-soft)',
        'smoke': 'var(--color-background-smoke)',
        'color-text': 'var(--color-text)',
        'neutrals': '#E8E8E8',
        'primary': '#7330DF',
        'secondary': '#C7ACF2',
        'tertiary': '#F1EAFC',
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
