module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      PTSansNarrow: ['PT Sans Narrow', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#f9fbff',
        black: 'var(--black)',
        gray: 'var(--gray)',
        lightgray: '#d9d9e2',
      },
    },
  },
  plugins: [],
}
