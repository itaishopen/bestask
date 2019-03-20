import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/user.js'
import CardsModule from './modules/cards.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserModule,
    CardsModule
  },
  state: {
      
  },
  mutations: {

  },
  actions: {

  }
})
