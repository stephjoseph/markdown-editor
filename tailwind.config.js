/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        1000: '#151619',
        900: '#1D1F22',
        800: '#2B2D31',
        700: '#35393F',
        600: '#5A6069',
        500: '#7C8187',
        400: '#C1C4CB',
        300: '#E4E4E4',
        300: '#E4E4E4',
        200: '#F5F5F5',
        200: '#F5F5F5',
        100: '#FFFFFF',
        orange: '#E46643',
        'orange-hover': '#F39765',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
