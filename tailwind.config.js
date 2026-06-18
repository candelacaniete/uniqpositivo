const accentGradient = 'linear-gradient(135deg, #FF6B00 0%, #E91E8C 52%, #7B2FBE 100%)';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        night: '#111111',
        cream: '#F5F0EB',
        warm: '#0D0B08',
        ash: '#A9A19A',
        line: '#27211F',
        orange: '#FF6B00',
        magenta: '#E91E8C',
        violet: '#7B2FBE',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        accent: accentGradient,
        'soft-radial': 'radial-gradient(circle at center, rgba(245, 240, 235, 0.1), transparent 58%)',
      },
      boxShadow: {
        glow: '0 0 34px rgba(233, 30, 140, 0.24)',
        'soft-card': '0 24px 80px rgba(0, 0, 0, 0.36)',
      },
    },
  },
  plugins: [],
};
