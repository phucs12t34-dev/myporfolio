/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: '#F7F5F0',
          sub: '#F0EEE8',
          card: '#FFFFFF',
          border: '#D8D5CD',
          borderSubtle: '#E7E4DC',
          text: '#171717',
          textMuted: '#66645F',
          textLight: '#8E8B83',
          accent: '#304FFE',
          accentHover: '#1E40AF',
          accentOrange: '#E85D3F',
          accentYellow: '#E8C96B',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'editorial-sm': '0 1px 3px 0 rgba(23, 23, 23, 0.04)',
        'editorial': '0 2px 8px -1px rgba(23, 23, 23, 0.04), 0 12px 24px -4px rgba(23, 23, 23, 0.03)',
        'editorial-lg': '0 8px 32px -4px rgba(23, 23, 23, 0.08), 0 2px 6px -1px rgba(23, 23, 23, 0.04)',
        'editorial-hover': '0 14px 38px -4px rgba(23, 23, 23, 0.10), 0 2px 8px -1px rgba(23, 23, 23, 0.06)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
