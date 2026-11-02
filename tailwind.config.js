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
        cyber: {
          bg: '#07080F',
          sub: '#0D0F18',
          card: '#131624',
          elevated: '#1A1E30',
          border: 'rgba(0, 240, 255, 0.2)',
          borderHover: 'rgba(0, 240, 255, 0.55)',
          cyan: '#00F0FF',
          pink: '#FF0055',
          yellow: '#CCFF00',
          orange: '#FF6B00',
          purple: '#9D00FF',
          dark: '#05060A'
        }
      },
      fontFamily: {
        marker: ['"Permanent Marker"', 'cursive'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -2px rgba(0, 240, 255, 0.45)',
        'neon-cyan-lg': '0 0 45px -5px rgba(0, 240, 255, 0.6)',
        'neon-pink': '0 0 20px -2px rgba(255, 0, 85, 0.45)',
        'neon-pink-lg': '0 0 45px -5px rgba(255, 0, 85, 0.6)',
        'neon-yellow': '0 0 20px -2px rgba(204, 255, 0, 0.45)',
        'sticker': '4px 6px 0px 0px rgba(0, 0, 0, 0.9)',
        'street-card': '0 12px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 2s infinite',
        'glitch': 'glitch 1s infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
