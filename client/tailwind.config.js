/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          'near-black': '#050505',
          dark: '#0A0A0C',
          'dark-gray': '#111114',
          'card-bg': '#121216',
          'card-hover': '#18181E',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
          purple: '#6D00FF',
          violet: '#8A00FF',
          magenta: '#D000FF',
          pink: '#F000D0',
          muted: '#A6A6B0',
          offwhite: '#F5F5F7',
          rule: 'rgba(208, 0, 255, 0.35)',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-everpeak': 'linear-gradient(135deg, #6D00FF 0%, #8A00FF 50%, #F000D0 100%)',
        'gradient-everpeak-hover': 'linear-gradient(135deg, #7E1CFF 0%, #9B1CFF 50%, #F51CD8 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0A0A0C 0%, #050505 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(109, 0, 255, 0.35)',
        'glow-lg': '0 0 50px -10px rgba(208, 0, 255, 0.3)',
        'glow-sm': '0 0 15px -3px rgba(138, 0, 255, 0.25)',
        card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 15s ease-in-out infinite alternate',
        gradientMove: 'gradientMove 3s ease infinite',
        'gradient-move': 'gradientMove 3s ease infinite',
        iconFloat: 'iconFloat 1.5s ease-in-out infinite',
        'icon-float': 'iconFloat 1.5s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, 40px) scale(1.08)' },
          '100%': { transform: 'translate(-20px, 60px) scale(0.95)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        iconFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};
