const accentGradient = 'linear-gradient(135deg, #9B4F35 0%, #C98763 52%, #D8B98C 100%)';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#F7F1E8',
        night: '#FFF9F1',
        cream: '#241F1B',
        warm: '#EFE2D1',
        ash: '#746A62',
        line: '#E2D3C4',
        orange: '#9B4F35',
        magenta: '#C98763',
        violet: '#D8B98C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        accent: accentGradient,
        'soft-radial': 'radial-gradient(circle at center, rgba(155, 79, 53, 0.12), transparent 58%)',
      },
      boxShadow: {
        glow: '0 18px 42px rgba(155, 79, 53, 0.18)',
        'soft-card': '0 24px 70px rgba(68, 48, 35, 0.12)',
      },
    },
  },
  plugins: [],
};
