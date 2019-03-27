import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/userStore.js';
import boardStore from './modules/boardStore.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userStore,
        boardStore
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },

})
