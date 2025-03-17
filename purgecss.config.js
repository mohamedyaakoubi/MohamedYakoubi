module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  css: ['.next/static/css/**/*.css'],
  output: '.next/static/css/',
  safelist: {
    standard: ['html', 'body'],
    deep: [/^gradient/, /^hero/, /^animate/, /^fixed/],
    greedy: [/dark$/, /rtl$/, /ltr$/]
  }
}