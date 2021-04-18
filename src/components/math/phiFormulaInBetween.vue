<template>
  <div>
    <math display="block">
      <mrow>
        <mi>P (a1 &#60; x &#60; a2)</mi>
        <mo>=</mo>
        <mi>P (x &#60; a2)</mi>
        <mo>-</mo>
        <mi>P (x &#60; a1)</mi>
      </mrow>
    </math>
    <br>
    <math display="block">
      <mrow>
        <mi>P (a1 &#60; x &#60; a2)</mi>
        <mo>=</mo>
        <mo>&Phi;</mo>
        <mfenced>
          <mrow>
            <mo>(</mo>
            <mfrac>
              <mrow>
                <mi>a2</mi>
                <mo>-</mo>
                <mi>&mu;</mi>
              </mrow>
              <mi>&sigma;</mi>
            </mfrac>
            <mo>)</mo>
          </mrow>
        </mfenced>
        <mo>-</mo>
        <mo>&Phi;</mo>
        <mfenced>
          <mrow>
            <mo>(</mo>
            <mfrac>
              <mrow>
                <mi>a1</mi>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PhiFormulaBetween'
})
</script>
