import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curentCategory: null
  },
  mutations: {
    setCurentCategory (state, data) {
      state.curentCategory = data ? data : null;
    }
  },
  getters: {
    getCurentCategory (state) {
      return state.curentCategory;
    }
  },
  actions: {
  },
  modules
})
