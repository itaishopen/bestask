import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/userStore.js'
import CardModule from './modules/cardStore.js'
import BoardModule from './modules/boardStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserModule,
    CardModule,
    BoardModule
  },
  state: {
      
  },
  mutations: {

  },
  actions: {

  },
})
