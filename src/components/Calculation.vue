<template>
  <div class="container">
    <div class="text-h3">{{$t('learn.calculation.procedure')}}</div>
    <br>
    <div v-if="isSmaller">
      <SmallerThanProcedure/>
    </div>
    <div v-if="isGreater">
      <GreaterThanProcedure/>
    </div>
    <div v-if="isBetween">
      <InBetweenProcedure/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SmallerThanProcedure from './calculationProcedures/smallerThan.vue'
import GreaterThanProcedure from './calculationProcedures/greaterThan.vue'
import InBetweenProcedure from './calculationProcedures/inBetween.vue'

export default Vue.extend({
  name: 'Calculation',
  components: {
    SmallerThanProcedure,
    GreaterThanProcedure,
    InBetweenProcedure
  },
  data () {
    return {
      //
    }
  },
  // updated () {
  //   // @ts-ignore
  //   window.MathJax.typeset()
  // },
  computed: mapState([
    'isGreater', 'isSmaller', 'isBetween', 'chartWidth'
  ])
})
</script>

<style scoped>
.container {
  margin: auto;
}
</style>
