<template>
  <div class="container">
    <h1 class="text-center">Calculation Procedure</h1>
    <div v-if="isGreater">
      <h2 class="text-center">1. Formula to use</h2>
      <PhiFormula/>
      <h2 class="text-center">2. Solve inner equation</h2>
      <PhiFormulaInner/>
      <PhiFormulaInnerInput/>
      <br>
      <h2 class="text-center">3. Look up z value in z Table</h2>
      <ZTable/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ZTable from './math/zTable.vue'
import PhiFormula from './math/phiFormula.vue'
import PhiFormulaInner from './math/phiFormulaInner.vue'
import PhiFormulaInnerInput from './math/phiFormulaInnerInput.vue'

export default Vue.extend({
  name: 'Calculation',
  components: {
    ZTable,
    PhiFormula,
    PhiFormulaInner,
    PhiFormulaInnerInput
  },
  data () {
    return {
      //
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween', 'probability'
  ])
})
</script>
