/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#007531',
        secondary: '#FCBC00',
        darkMain: '#064E37',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
