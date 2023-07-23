/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'],
  theme: {
    colors: {

    },
    extend: {
      backgroundImage: {
        'main-gradient': `linear-gradient(270deg, var(--main-gradient-start) 0%, var(--main-gradient-end) 100%)`,
        'alt-gradient': `linear-gradient(270deg, var(--alt-gradient-start) 0%, var(--alt-gradient-end) 100%)`,
        'green-gradient': `linear-gradient(270deg, #24CB67 0%, #A6D189 100%)`,
      },
      colors: {
        rosewater: 'rgb(var(--rosewater) , <alpha-value>)',
        flamingo: 'rgb(var(--flamingo) , <alpha-value>)',
        pink: 'rgb(var(--pink) , <alpha-value>)',
        mauve: 'rgb(var(--mauve) , <alpha-value>)',
        red: 'rgb(var(--red) , <alpha-value>)',
        maroon: 'rgb(var(--maroon) , <alpha-value>)',
        peach: 'rgb(var(--peach) , <alpha-value>)',
        yellow: 'rgb(var(--yellow) , <alpha-value>)',
        green: 'rgb(var(--green) , <alpha-value>)',
        teal: 'rgb(var(--teal) , <alpha-value>)',
        sky: 'rgb(var(--sky) , <alpha-value>)',
        sapphire: 'rgb(var(--sapphire) , <alpha-value>)',
        blue: 'rgb(var(--blue) , <alpha-value>)',
        lavender: 'rgb(var(--lavender) , <alpha-value>)',
        text: 'rgb(var(--text) , <alpha-value>)',
        'subtext-1': 'rgb(var(--subtext-1) , <alpha-value>)',
        'subtext-0': 'rgb(var(--subtext-0) , <alpha-value>)',
        'overlay-2': 'rgb(var(--overlay-2) , <alpha-value>)',
        'overlay-1': 'rgb(var(--overlay-1) , <alpha-value>)',
        'overlay-0': 'rgb(var(--overlay-0) , <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) , <alpha-value>)',
        'surface-1': 'rgb(var(--surface-1) , <alpha-value>)',
        'surface-0': 'rgb(var(--surface-0) , <alpha-value>)',
        base: 'rgb(var(--base) , <alpha-value>)',
        mantle: 'rgb(var(--mantle) , <alpha-value>)',
        crust: 'rgb(var(--crust) , <alpha-value>)',
        white: '#ffffff'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto Flex', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
