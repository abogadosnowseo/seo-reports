/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:    '#1E2344',
          navyDark:'#06010F',
          orange:  '#EE7023',
          coral:   '#E83F58',
          purple:  '#8A2685',
          black:   '#000000',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #EE7023 0%, #E83F58 50%, #8A2685 100%)',
        'brand-gradient-v': 'linear-gradient(180deg, #EE7023 0%, #E83F58 50%, #8A2685 100%)',
      },
    },
  },
  plugins: [],
}
