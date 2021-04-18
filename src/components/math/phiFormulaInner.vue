<template>
  <math display="block">
    <mrow>
      <mi>{{zName}}</mi>
      <mo>=</mo>
      <mrow>
        <mfrac>
          <mrow>
            <mi>a</mi>
            <mo>-</mo>
            <mi>&mu;</mi>
          </mrow>
          <mi>&sigma;</mi>
        </mfrac>
      </mrow>
    </mrow>
  </math>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PhiFormulaInner',
  props: {
    zName: {
      type: String,
      default: 'z'
    }
  }
})
</script>
