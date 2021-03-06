import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mean: 0,
    std: 1,
    aValue: 0,
    aValueStart: -0.5,
    aValueEnd: 0.5,
    isGreater: false,
    isSmaller: true,
    isBetween: false,
    probability: 0.5,
    probabilityTable: 0.5,
    probabilityTableTwo: 0.5,
    zValue: 0.00,
    zValueTwo: 0.00,
    chartWidth: 960
  },
  mutations: {
    setMean (state, val: any) {
      state.mean = parseFloat(val)
    },
    setStd (state, val: any) {
      state.std = parseFloat(val)
    },
    setAValue (state, val: any) {
      state.aValue = parseFloat(val)
    },
    setAValueStart (state, val: any) {
      state.aValueStart = parseFloat(val)
    },
    setAValueEnd (state, val: any) {
      state.aValueEnd = parseFloat(val)
    },
    setMode (state, val: string) {
      if (val === 'greater') {
        state.isGreater = true
        state.isSmaller = false
        state.isBetween = false
      } else if (val === 'smaller') {
        state.isGreater = false
        state.isSmaller = true
        state.isBetween = false
      } else {
        state.isGreater = false
        state.isSmaller = false
        state.isBetween = true
      }
    },
    setProbability (state, val: number) {
      state.probability = val
    },
    setZValue (state, val: number) {
      state.zValue = val
    },
    setZValueTwo (state, val: number) {
      state.zValueTwo = val
    },
    setProbabilityTable (state, val: number) {
      state.probabilityTable = val
    },
    setProbabilityTableTwo (state, val: number) {
      state.probabilityTableTwo = val
    },
    setChartWidth (state, val: number) {
      state.chartWidth = val
    }
  },
  actions: {
  },
  modules: {
  }
})
