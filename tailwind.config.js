const accentGradient = 'linear-gradient(135deg, #8F4A2F 0%, #43513A 48%, #C59A62 100%)';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#E8D3B6',
        night: '#F4E7D2',
        cream: '#241913',
        warm: '#C9AA82',
        ash: '#685747',
        line: '#A47F5F',
        orange: '#8F4A2F',
        magenta: '#43513A',
        violet: '#C59A62',
        moss: '#43513A',
        earth: '#241913',
        terracotta: '#8F4A2F',
        sand: '#E8D3B6',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        accent: accentGradient,
        'soft-radial': 'radial-gradient(circle at center, rgba(67, 81, 58, 0.18), transparent 58%)',
      },
      boxShadow: {
        glow: '0 20px 52px rgba(67, 81, 58, 0.24)',
        'soft-card': '0 26px 80px rgba(36, 25, 19, 0.18)',
      },
    },
  },
  plugins: [],
};
