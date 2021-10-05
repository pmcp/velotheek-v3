import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { fr, nl } from '@braid/vue-formulate-i18n'
Vue.use(VueFormulate,  {
  plugins: [ fr, nl ],
  locale: fr
})
VueFormulate.setLocale('fr')
