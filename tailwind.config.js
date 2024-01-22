/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      gridTemplateColumns: {
        // Complex site-specific columns configuration
        dashboard: '20% minmax(0, 1fr)',
      },
      gridTemplateRows: {
        // Complex site-specific rows configuration
        dashboard: 'auto minmax(0, 1fr) minmax(0, 1fr)',
      },
    },
  },
  plugins: [],
};
