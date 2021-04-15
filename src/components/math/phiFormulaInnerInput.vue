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
      <mi>{{Number(zValue).toFixed(2)}}</mi>
    </mrow>
  </math>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'PhiFormulaInnerInput',
  data () {
    return {
      zValue: 0
    }
  },
  methods: {
    calcZValue () {
      this.zValue = ((this.aValue as any) - (this.mean as any)) / (this.std as any)
      this.$store.commit('setZValue', this.zValue)
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue'
  ]),
  watch: {
    mean: function (val) {
      this.calcZValue()
    },
    std: function (val) {
      this.calcZValue()
    },
    aValue: function (val) {
      this.calcZValue()
    }
  }
})
</script>
