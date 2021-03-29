import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mean: 0,
    std: 0,
    aValue: 0
  },
  mutations: {
    setMean (state, val: number) {
      state.mean = val
    },
    setStd (state, val: number) {
      state.std = val
    },
    setAValue (state, val: number) {
      state.aValue = val
    }
  },
  actions: {
  },
  modules: {
  }
})
