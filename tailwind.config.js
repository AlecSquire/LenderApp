/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.{js,jsx,ts,tsx,blade.php}',
    './resources/views/**/*.blade.php',
    './resources/css/**/*.css', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}