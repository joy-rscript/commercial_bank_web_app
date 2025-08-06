/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2A6496',
        secondary: '#FFC52A',
        'secondary-dark': '#FFB000',
        'deep-secondary-contrast': '#2A6496',
        'light-secondary-contrast': '#5A8BC4',
        'tainted-yellow': '#FFD75E',
        'form-header-light': '#F5F5F5',
        'heading-bgcolor': '#E8F4FD',
        'money': '#16A34A',
        'error': '#EF4444',
        'light-error': '#FCA5A5'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}