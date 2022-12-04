/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss')
const colors = require('tailwindcss/colors')
const formTailwind = require('@tailwindcss/forms')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,ts}"],
  theme: {
    maxWidth: {
      'sidebar': '12rem',
    },
    extend: {
      colors: {
        blue: colors.blue,
        'mute': 'var(--color-background-mute)',
        'soft': 'var(--color-background-soft)',
        'smoke': 'var(--color-background-smoke)',
        'color-text': 'var(--color-text)',
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
