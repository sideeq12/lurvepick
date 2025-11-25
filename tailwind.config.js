/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate 900
          foreground: '#f8fafc', // Slate 50
        },
        secondary: {
          DEFAULT: '#f1f5f9', // Slate 100
          foreground: '#0f172a',
        },
        accent: {
          DEFAULT: '#3b82f6', // Blue 500
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f1f5f9', // Slate 100
          foreground: '#64748b', // Slate 500
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },
        background: '#ffffff',
        foreground: '#0f172a',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}

