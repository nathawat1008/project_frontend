/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        '10': 'repeat(10, minmax(0, 1fr))',

        // Complex site-specific row configuration
        // 'layout': '200px minmax(900px, 1fr) 100px',
      }

    },
  },
  plugins: [],
}