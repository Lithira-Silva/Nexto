/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Color Palette
        'midnight-blue': '#1A2533',
        'frost-white': '#F7F9FC',
        'emerald-green': '#2DD4BF',
        'sunset-orange': '#F97316',
        'slate-gray': '#64748B',
        'lavender-glow': '#A78BFA',
        'obsidian-black': '#0F172A',
        'cloud-gray': '#D1D5DB',
        
        // Extended palette variations
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#1A2533', // midnight-blue
          950: '#102a43',
        },
        
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748B', // slate-gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        
        success: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2DD4BF', // emerald-green
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        warning: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F97316', // sunset-orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#A78BFA', // lavender-glow
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        
        // Legacy colors for backward compatibility
        'nexto-primary': '#1A2533',
        'nexto-secondary': '#64748B',
        'nexto-accent': '#A78BFA',
        'nexto-light': '#F7F9FC',
        'nexto-dark': '#0F172A',
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'modern-gradient': 'linear-gradient(135deg, #F7F9FC 0%, #e2e8f0 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1A2533 100%)',
        'success-gradient': 'linear-gradient(135deg, #2DD4BF 0%, #14b8a6 100%)',
        'warning-gradient': 'linear-gradient(135deg, #F97316 0%, #ea580c 100%)',
        'accent-gradient': 'linear-gradient(135deg, #A78BFA 0%, #8b5cf6 100%)',
      },
      
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'space': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-success': 'pulseSuccess 2s ease-in-out infinite',
        'pulse-warning': 'pulseWarning 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(167, 139, 250, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.4), 0 0 30px rgba(167, 139, 250, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseSuccess: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(45, 212, 191, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.6), 0 0 30px rgba(45, 212, 191, 0.3)' },
        },
        pulseWarning: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(249, 115, 22, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.3)' },
        },
      },
      
      boxShadow: {
        'modern': '0 4px 6px -1px rgba(26, 37, 51, 0.1), 0 2px 4px -1px rgba(26, 37, 51, 0.06)',
        'modern-lg': '0 10px 15px -3px rgba(26, 37, 51, 0.1), 0 4px 6px -2px rgba(26, 37, 51, 0.05)',
        'modern-xl': '0 20px 25px -5px rgba(26, 37, 51, 0.1), 0 10px 10px -5px rgba(26, 37, 51, 0.04)',
        'success-glow': '0 0 10px rgba(45, 212, 191, 0.3)',
        'warning-glow': '0 0 10px rgba(249, 115, 22, 0.3)',
        'accent-glow': '0 0 10px rgba(167, 139, 250, 0.3)',
        'dark-modern': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
