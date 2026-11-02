/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          sub: '#09090C',
          card: '#0D0D11',
          elevated: '#121218',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(155, 92, 255, 0.35)',
          textPrimary: '#F4F1FA',
          textSecondary: '#A6A2AF',
          textMuted: '#686571',
        },
        accent: {
          DEFAULT: '#9B5CFF',
          glow: 'rgba(155, 92, 255, 0.22)',
          glowStrong: 'rgba(155, 92, 255, 0.45)',
          secondary: '#B994FF',
          cyan: '#38BDF8',
          emerald: '#34D399',
          amber: '#FBBF24',
          rose: '#F43F5E'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'specular': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glow-purple': '0 0 35px -5px rgba(155, 92, 255, 0.28)',
        'glow-purple-lg': '0 0 60px -10px rgba(155, 92, 255, 0.4)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.07)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'glow-spin': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
