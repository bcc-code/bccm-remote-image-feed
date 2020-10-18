module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  purge: [],
  theme: {
    fontFamily: {
      'sans': 'ClashGrotesk, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    stroke: theme => ({
      'current': 'currentColor',
      'red': theme('colors.red.500'),
      'black': theme('colors.black'),
      'white': theme('colors.white'),
    }),
    extend: {
      colors: {
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#181818',
        },
        orange: {
          '500': '#F1904A'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
