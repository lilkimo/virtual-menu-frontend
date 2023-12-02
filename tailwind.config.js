const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      white: 'var(--white)',
      black: 'var(--black)',
      gray: {
        50: 'var(--extra-light-gray)',
        100: 'var(--light-gray)',
        200: '#cdd1d4',
        300: '#a9aeb7',
        400: '#7f8691',
        DEFAULT: 'var(--gray)',
        600: '#555a65',
        700: '#494c55',
        800: '#414349',
        900: '#393b40',
        950: '#232429',
      },
      blue: 'var(--blue)',
      red: 'var(--red)',
      green: 'var(--green)',
    },
    extend: {
      boxShadow: {
        DEFAULT: '0px 10px 32px 0px rgba(23, 25, 44, 0.05) , 0px 5px 20px 0px rgba(23, 25, 44, 0.01) ',
      },
      fontSize: {
        xxs: ['0.625rem', '0.875rem'],
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(function ({matchUtilities, theme}) {
      matchUtilities(
        {
          color: value => ({
            color: value,
          }),
        },
        {values: theme('colors')}
      )
    }),
  ],
}
