<template>
  <div class="v-flex mt-5">
    <p v-if="isGreater">{{$t('probability')}}: F( x &le; {{aValue}} ) = {{probability.toFixed(4)}}</p>
    <p v-if="isSmaller">{{$t('probability')}}: F( {{aValue}} &le; x ) = {{probability.toFixed(4)}}</p>
    <p v-if="isBetween">{{$t('probability')}}: F( {{aValueStart}} &le; x &le; {{aValueEnd}}) = {{probability.toFixed(4)}}</p>
  </div>
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
      if (this.isGreater) {
        this.probability = this.calcERF(this.mean, this.aValue, this.std)
      } else if (this.isSmaller) {
        this.probability = 1 - this.calcERF(this.mean, this.aValue, this.std)
      } else {
        const startProba = this.calcERF(this.mean, this.aValueEnd, this.std)
        const endProba = this.calcERF(this.mean, this.aValueStart, this.std)
        this.probability = startProba - endProba
      }
    },
    calcERF (mean: number, aValue: number, std: number) {
      const math = create(all, {})
      // @ts-ignore
      return (1 - math.erf((mean - aValue) / (Math.sqrt(2) * std))) / 2
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
