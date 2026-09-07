import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      colors: {
        brand: {
          blue: '#1e3a8a',
          teal: '#14b8a6',
          'light-blue': '#e0f2fe',
          'mid-blue': '#6baed6',
          dark: '#1e293b',
          green: '#4a7c3f',
        },
      },
    },
  },
  plugins: [],
};

export default config;
