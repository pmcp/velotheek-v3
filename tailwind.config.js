const colors = require('tailwindcss/colors')
module.exports = {
  plugins: [
    require(`@tailwindcss/typography`)
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      green: {
        50: '#ebfffa',
        100: '#e5fff9',
        200: '#dbfff6',
        300: '#d1fff3',
        400: '#c7ffef',
        500: '#bdffeb',
        600: '#75ffd8',
        700: '#29ffc6',
        800: '#00e0a8',
        900: '#009471',
      },
      yellow: {
        50: '#fffef5',
        100: '#fffeeb',
        200: '#fffddb',
        300: '#fffcc7',
        400: '#fffbb8',
        500: '#fffba8',
        600: '#fff86b',
        700: '#fff52e',
        800: '#f0e400',
        900: '#b3aa00',
      },
      pink: {
        50: '#fef1f6',
        100: '#fde7f0',
        200: '#fbd0e2',
        300: '#f8afce',
        400: '#f584b3',
        500: '#f0478d',
        550: '#ee2a7b',
        600: '#d01160',
        700: '#a00d4a',
        800: '#890b3f',
        900: '#710935',
      },
      pink: {

        50: '#d1fff3',
        100: '#c7ffef',
        200: '#bdffeb',
        300: '#75ffd8',
        400: '#29ffc6',
        500: '#009471',
        600: '#009471',
        700: '#009471',
        800: '#009471',
        900: '#009471',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
