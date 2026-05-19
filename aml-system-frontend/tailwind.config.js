/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Aap ke AML design ke mutabiq core corporate colors
        'aml-blue-dark': '#0f172a',  // Dark sidebar color
        'aml-blue-primary': '#1e40af', // Main buttons and links
        'aml-bg-light': '#f8fafc',    // Soft light background
        'aml-pink-accent': '#fce7f3'  // Light pink accents for interactive states
      }
    },
  },
  plugins: [],
}