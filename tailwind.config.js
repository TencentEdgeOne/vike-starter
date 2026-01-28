/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        gradientMove: 'gradientMove 8s ease-in-out infinite alternate',
        gradientMove2: 'gradientMove2 8s ease-in-out infinite alternate'
      },
      keyframes: {
        gradientMove: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-250px) translateY(120px)' },
          '100%': { transform: 'translateX(0) translateY(0)' }
        },
        gradientMove2: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(250px) translateY(-120px)' },
          '100%': { transform: 'translateX(0) translateY(0)' }
        }
      },
      boxShadow: {
        'cyan': '2px 2px 0 #0debd8'
      }
    }
  },
  plugins: []
}
