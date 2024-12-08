/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'], // Ensure Tailwind scans all necessary files
  theme: {
    extend: {
      fontFamily: {
        'saved-by-zero': ['"Saved by Zero"', 'sans-serif'], // Add the font here
      },
      backgroundImage: {
        'hero-bg': "url('src/assets/bg.png')"  // Replace with your actual image path
      }
    },
  },
  plugins: [],
};
