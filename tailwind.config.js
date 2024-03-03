/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#008bff',
        'primary-focus': '#0082ef',
        'primary-content': 'white',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#eeeeee',
        'base-content': 'black',
        'error': '#ef002f',
      },
      fontFamily: {
        'inter': "Inter, sans-serif"
      }
    },
  },
  plugins: [],
}

