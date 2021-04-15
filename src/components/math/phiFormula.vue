<template>
  <math display="block">
    <mrow>
      <mi>P (x &#60; a)</mi>
      <mo>=</mo>
      <mo>&Phi;</mo>
      <mfenced>
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
      </mfenced>
    </mrow>
  </math>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'PhiFormula'
})
</script>
