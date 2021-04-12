<template>
  <div class="container">
    <h1 class="text-center">Calculation Procedure</h1>
    <div v-if="isGreater">
      <h2>Formula to use</h2>
      <vue-mathjax :formula="formula"></vue-mathjax>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
// @ts-ignore
import { VueMathjax } from 'vue-mathjax'

export default Vue.extend({
  name: 'Calculation',
  components: {
    'vue-mathjax': VueMathjax
  },
  data () {
    return {
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween'
  ])
})
</script>
