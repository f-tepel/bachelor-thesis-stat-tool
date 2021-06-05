import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { messages, defaultLocale } from '@/i18n'
import VueMeta from 'vue-meta'

Vue.use(VueI18n)
Vue.use(VueMeta)

Vue.config.productionTip = false

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
