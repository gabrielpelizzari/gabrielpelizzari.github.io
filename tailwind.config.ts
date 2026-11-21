import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './server/**/*.ts',
    './data/**/*.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#09090b',
          900: '#111113',
          850: '#16161a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
