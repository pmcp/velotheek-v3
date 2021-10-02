import { nl, fr } from '@braid/vue-formulate-i18n'

export default {
  plugins: [nl, fr],
  locale: 'fr',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  },

  classes: {
    outer: 'mb-3',
    wrapper(context) {
      switch (context.classification) {
        case 'button':
          return ''
        case 'box':
          return 'w-full flex justify-start'
        default:
          return 'py-2  w-full'
      }
    },
    label(context) {
      switch (context.classification) {
        case 'box':
          return 'bg-orange-dark flex-grow'
        default:
          return 'w-full block text-black px-4 text-lg'
      }
    },
    element({ classification }) {
      switch (classification) {
        case 'box':
          return 'px-1'
        default:
          return 'w-full font-medium text-sm'
      }
    },
    // input(context) {
    //   switch (context.classification) {
    //     case 'button':
    //       return 'text-lg border-2 rounded-full h-12 bg-red-900 border-red-500 font-bold px-10 hover:bg-red-500 transition-colors duration-500 focus:outline-none'
    //     case 'textarea':
    //       return 'bg-transparent w-full mt-2 h-48 focus:outline-none text-xl placeholder-gray-700 px-4'
    //     case 'box':
    //       return 'h-6 w-6'
    //     default:
    //       return 'bg-transparent w-full h-10 focus:outline-none text-xl placeholder-gray-700 px-4'
    //   }
    // },
    // TODO: design rings of radio
    input(context) {
      switch (context.classification) {
        case 'button':
          return 'bg-blue-400 hover:bg-blue-500 hover:text-white text-white font-bold py-2 px-4'
        case 'textarea':
          return 'border border-black px-3 py-2 leading-none focus:border-green-light outline-none border-box w-full mb-1'
        case 'box':
          return 'h-6 w-6'
        case 'select':
          return 'rounded border w-full px-2 text-gray-700 h-8 border-gray-400'
        default:
          return 'border border-black px-3 py-2 leading-none focus:border-green-light outline-none border-box w-full mb-1'
      }
    },
    help: 'text-xs mb-1 text-green-dark',
    error: 'text-orange-dark text-xs mb-1'
  }
}
