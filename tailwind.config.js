/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nusantara: {
          gold: "#F59E0B",
          goldLight: "#FDE68A",
          goldDark: "#B45309",
          maroon: "#881337",
          maroonLight: "#BE123C",
          maroonDark: "#4C0519",
          emerald: "#047857",
          emeraldLight: "#10B981",
          emeraldDark: "#064E3B",
          wood: "#78350F",
          woodLight: "#92400E",
          woodDark: "#451A03",
          cream: "#FEF3C7",
          warmBg: "#FFFBEB"
        }
      },
      fontFamily: {
        game: ['"Fredoka"', '"Comic Sans MS"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'game': '0 8px 0px rgba(0, 0, 0, 0.25)',
        'game-pressed': '0 2px 0px rgba(0, 0, 0, 0.25)',
        'card-game': '0 10px 0px rgba(120, 53, 15, 0.4)',
      },
      animation: {
        'wobble-slow': 'wobble 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-4deg) scale(1.04)' },
          '75%': { transform: 'rotate(4deg) scale(1.04)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' },
          '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 18px rgba(245, 158, 11, 0.9))' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
