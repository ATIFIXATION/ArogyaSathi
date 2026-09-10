/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F6F0E6',
          light: '#FAF7F0',
          dark: '#EBE2D3',
        },
        paper: {
          DEFAULT: '#EFE5D5',
          light: '#F8F3EA',
          warm: '#F4ECE0',
          dark: '#E4D6C3',
        },
        terracotta: {
          DEFAULT: '#B94A25',
          deep: '#9E3E20',
          light: '#FBF0EB',
          subtle: '#F6E4DC',
          hover: '#A53E1D',
        },
        forest: {
          DEFAULT: '#405642',
          deep: '#283A2A',
          dark: '#1E2C20',
          light: '#F0F5F0',
          subtle: '#E2EBE2',
          muted: '#5C745E',
        },
        olive: {
          DEFAULT: '#788568',
          light: '#F2F5EF',
          muted: '#8A977A',
        },
        ink: {
          DEFAULT: '#211C17',
          deep: '#171410',
          light: '#3D352C',
          muted: '#756B60',
          subtle: '#9E9488',
        },
        border: {
          soft: '#DCCDBB',
          subtle: '#EAE0D2',
          muted: '#D0C1AD',
        },
        risk: {
          high: '#B94A25',
          medium: '#D98A2C',
          low: '#405642',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(33, 28, 23, 0.05), 0 2px 6px -1px rgba(33, 28, 23, 0.03)',
        'paper': '0 8px 30px -4px rgba(64, 86, 66, 0.06), 0 2px 8px -2px rgba(33, 28, 23, 0.04)',
        'card': '0 12px 36px -6px rgba(33, 28, 23, 0.08), 0 4px 12px -2px rgba(33, 28, 23, 0.03)',
      }
    },
  },
  plugins: [],
}
