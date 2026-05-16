/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        panel: 'rgba(20, 20, 25, 0.6)',
        panelHover: 'rgba(30, 30, 40, 0.8)',
        primary: '#8b5cf6', // purple-500
        primaryGlow: 'rgba(139, 92, 246, 0.4)',
        secondary: '#a78bfa', // purple-400
        risk: '#ef4444', // red-500
        safe: '#10b981', // green-500
        accent: '#f59e0b', // yellow-500
        border: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(139, 92, 246, 0.3)',
        'neon-strong': '0 0 25px rgba(139, 92, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
