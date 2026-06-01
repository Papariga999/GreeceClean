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
          DEFAULT: '#0D6FDB',
          50:  '#EAF2FC',
          100: '#D2E3FB',
          200: '#A6C7F7',
          300: '#79ABF3',
          400: '#4D8FEF',
          500: '#0D6FDB',
          600: '#0B57AD',
          700: '#084A92',
          800: '#063463',
          900: '#031C36',
        },
        action: {
          DEFAULT: '#39B24A',
          50:  '#ECF7EE',
          100: '#D7EFDB',
          200: '#AEDFB6',
          300: '#BFE0C6',
          400: '#5DBF6D',
          500: '#39B24A',
          600: '#2E8C3B',
          700: '#2E7D34',
          800: '#17471D',
          900: '#0B230F',
        },
        'sea-mist': '#F2F7FB',
        // Severity tiers for elapsed-time pressure UI
        warning: {
          DEFAULT: '#d97706',
          light: '#fef3c7',
          text: '#92400e',
        },
        overdue: {
          DEFAULT: '#ea580c',
          light: '#fff7ed',
          text: '#7c2d12',
        },
        critical: {
          DEFAULT: '#dc2626',
          light: '#fef2f2',
          text: '#991b1b',
        },
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
