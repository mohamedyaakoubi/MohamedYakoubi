/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Remove the PurgeCSS plugin that's causing conflicts with next/font
  },
}