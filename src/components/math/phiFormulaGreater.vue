<template>
  <math display="block">
    <mrow>
      <mi>P (x &le; a)</mi>
      <mo>=</mo>
      <mi>1</mi>
      <mo>-</mo>
      <mo>&Phi;</mo>
      <mfenced>
        <mrow>
          <mo>(</mo>
          <mfrac>
            <mrow>
              <mi>a</mi>
              <mo>-</mo>
              <mi>&mu;</mi>
            </mrow>
            <mi>&sigma;</mi>
          </mfrac>
          <mo>)</mo>
        </mrow>
      </mfenced>
    </mrow>
  </math>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PhiFormulaGreater'
})
</script>
