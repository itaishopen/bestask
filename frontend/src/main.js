import Vue from 'vue'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Spinner from 'vue-spinkit'

Vue.component('Spinner', Spinner)

import '@/assets/css/main.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Spinner,
  render: h => h(App)
}).$mount('#app')
