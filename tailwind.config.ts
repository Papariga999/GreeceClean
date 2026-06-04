import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#006994',
          50:  '#E6EFF3',
          100: '#C0DAE3',
          200: '#8BBDCD',
          300: '#56A0B7',
          400: '#2285A4',
          500: '#006994',
          600: '#005A80',
          700: '#004A6A',
          800: '#003851',
          900: '#002636',
        },
        sky: {
          DEFAULT: '#0090C4',
          50:  '#E6F4FA',
          100: '#C0E4F1',
          200: '#87CDE6',
          300: '#4FB6DB',
          400: '#1F9FCF',
          500: '#0090C4',
          600: '#0079A4',
          700: '#006184',
        },
        action: {
          DEFAULT: '#6B7C3A',
          50:  '#F0F2E9',
          100: '#DCE1C8',
          200: '#C0C99B',
          300: '#A4B16E',
          400: '#889A4D',
          500: '#6B7C3A',
          600: '#5A6830',
          700: '#495427',
          800: '#353D1C',
          900: '#232911',
        },
        sand: {
          DEFAULT: '#C9A96E',
          50:  '#F8F3EA',
          100: '#EFE3CC',
          200: '#E0C9A0',
          300: '#D1B681',
          600: '#A8843F',
          700: '#8A6B30',
        },
        marble: {
          DEFAULT: '#F5F2ED',
          dark:    '#E8E3DA',
        },
        ink: {
          DEFAULT: '#1A1A2E',
          700:     '#23233C',
        },
        // Severity tiers for elapsed-time pressure UI
        warning: {
          DEFAULT: '#C57A3C',
          light: '#F8EEE3',
          text: '#7A4510',
        },
        overdue: {
          DEFAULT: '#C57A3C',
          light: '#F8EEE3',
          text: '#7A4510',
        },
        critical: {
          DEFAULT: '#9A3517',
          light: '#F5E0D8',
          text: '#6B1F0A',
        },
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans:    ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif:   ['var(--font-display)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
