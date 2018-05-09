import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import { apolloProvider } from './services/apollo'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'

// Helpers
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.lighten2
  }
})

Vue.config.productionTip = false

new Vue({
  provide: apolloProvider.provide(),
  router,
  render: h => h(App)
}).$mount('#app')
