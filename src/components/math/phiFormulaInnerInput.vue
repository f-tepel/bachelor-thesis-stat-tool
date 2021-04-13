<template>
  <math display="block">
    <mrow>
      <mi>z</mi>
      <mo>=</mo>
      <mrow>
        <mfrac>
          <mrow>
            <mi>{{aValue}}</mi>
            <mo>-</mo>
            <mi>{{mean}}</mi>
          </mrow>
          <mi>{{std}}</mi>
        </mfrac>
      </mrow>
      <mo>=</mo>
      <mi>{{zValue}}</mi>
    </mrow>
  </math>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PhiFormulaInnerInput',
  props: ['aValue', 'mean', 'std'],
  computed: {
    zValue () {
      return ((this.aValue as any) - (this.mean as any)) / (this.std as any)
    }
  }
})
</script>
