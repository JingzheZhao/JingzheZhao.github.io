/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: {
          deep: '#0a1628',
          ocean: '#132a45',
        },
        accent: {
          cyan: '#00e5ff',
          teal: '#00ffc8',
          purple: '#a855f7',
          coral: '#ff6b9d',
        },
        text: {
          primary: '#e8f4f8',
          secondary: '#94b8c5',
        },
      },
      backgroundImage: {
        site: "linear-gradient(135deg, #0a1628 0%, #132a45 50%, #1a3a5a 100%)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ocean-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.15), transparent 70%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.5)',
        'glow-teal': '0 0 20px rgba(0, 255, 200, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
    },
  },
  plugins: [],
};