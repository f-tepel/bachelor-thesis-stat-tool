<template>
  <h1>{{probability}}</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { create, all } from 'mathjs'

export default Vue.extend({
  name: 'Probability',
  data () {
    return {
      probability: 0.5
    }
  },
  mounted () {
    this.calcProbability()
  },
  methods: {
    calcProbability () {
      const math = create(all, {})
      if (this.isGreater) {
        this.probability = (1 - math.erf((this.mean - this.aValue) / (Math.sqrt(2) * this.std))) / 2
      } else if (this.isSmaller) {
        this.probability = 1 - (1 - math.erf((this.mean - this.aValue) / (Math.sqrt(2) * this.std))) / 2
      } else {
        const startProba = (1 - math.erf((this.mean - this.aValueEnd) / (Math.sqrt(2) * this.std))) / 2
        const endProba = (1 - math.erf((this.mean - this.aValueStart) / (Math.sqrt(2) * this.std))) / 2
        this.probability = startProba - endProba
      }
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween'
  ]),
  watch: {
    mean: function (val) {
      this.calcProbability()
    },
    std: function (val) {
      this.calcProbability()
    },
    aValue: function (val) {
      this.calcProbability()
    },
    aValueStart: function (val) {
      this.calcProbability()
    },
    aValueEnd: function (val) {
      this.calcProbability()
    },
    isGreater: function (val) {
      this.calcProbability()
    },
    isSmaller: function (val) {
      this.calcProbability()
    },
    isBetween: function (val) {
      this.calcProbability()
    }
  }
})
</script>
