/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: { 50: '#0a0a0f', 100: '#050508', 200: '#0d0d14', 300: '#16161f' },
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          green: '#10B981',
          pink: '#EC4899',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delay': 'float 10s ease-in-out 2s infinite',
        'spin-slow': 'spin 40s linear infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        scrollBounce: { '0%,100%': { transform: 'translateY(0)', opacity: '1' }, '50%': { transform: 'translateY(8px)', opacity: '0.4' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
