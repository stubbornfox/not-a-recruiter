/** @type {import('tailwindcss').Config} */

const formKitTailwind = require('@formkit/themes/tailwindcss')
const colors = require('tailwindcss/colors')
const formTailwind = require('@tailwindcss/forms')

module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,ts}"],
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
  plugins: [formKitTailwind, formTailwind],
}
