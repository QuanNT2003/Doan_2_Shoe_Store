/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ct-blue': {
          100: '#3A57E8',
        },
        'ct-black': {
          100: '#D0D5DD',
          200: '#667085',
          300: '#101828',
        },
        success: '#12B76A',
        warning: '#F79009',
        error: '#F04438',
      }
    },
  },
  plugins: [],
}

