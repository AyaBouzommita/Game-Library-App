/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: '#0f172a',
          card: '#1e293b',
          accent: '#6366f1',
          neon: '#10b981',
          purple: '#8b5cf6',
          pink: '#ec4899'
        }
      }
    },
  },
  plugins: [],
}
