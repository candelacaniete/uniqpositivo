const accentGradient = 'linear-gradient(135deg, #B69B73 0%, #B69B73 100%)';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#EFE6D8',
        night: '#F8F1E7',
        cream: '#2A241D',
        warm: '#C8B7A2',
        ash: '#7B6E60',
        line: '#D8C8B8',
        orange: '#9B765E',
        magenta: '#B69B73',
        violet: '#D6C4A3',
        moss: '#6F715F',
        earth: '#2A241D',
        terracotta: '#9B765E',
        sand: '#EFE6D8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Libre Baskerville"', 'Georgia', 'serif'],
        script: ['Allura', 'cursive'],
      },
      backgroundImage: {
        accent: accentGradient,
        'soft-radial': 'radial-gradient(circle at center, rgba(182, 155, 115, 0.12), transparent 58%)',
      },
      boxShadow: {
        glow: '0 14px 38px rgba(42, 36, 29, 0.08)',
        'soft-card': '0 24px 60px rgba(42, 36, 29, 0.08)',
      },
    },
  },
  plugins: [],
};
