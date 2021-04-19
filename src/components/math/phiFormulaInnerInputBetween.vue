<template>
  <math display="block">
    <mrow>
      <mi>{{zName}}</mi>
      <mo>=</mo>
      <mrow>
        <mfrac>
          <mrow>
            <mi v-if="zName=='z1'">{{aValueStart}}</mi>
            <mi v-if="zName=='z2'">{{aValueEnd}}</mi>
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
  name: 'PhiFormulaInnerInputBetween',
  props: {
    zName: {
      type: String
    }
  },
  data () {
    return {
      zValue: 0,
      aValue: 0
    }
  },
  methods: {
    calcZValue () {
      var zValue
      if (this.zName === 'z1') {
        zValue = ((this.aValueStart as any) - (this.mean as any)) / (this.std as any)
        this.$store.commit('setZValue', zValue)
        this.zValue = zValue
      } else {
        zValue = ((this.aValueEnd as any) - (this.mean as any)) / (this.std as any)
        this.$store.commit('setZValueTwo', zValue)
        this.zValue = zValue
      }
    }
  },
  computed: mapState([
    'mean', 'std', 'aValueStart', 'aValueEnd'
  ]),
  watch: {
    mean: function (val) {
      this.calcZValue()
    },
    std: function (val) {
      this.calcZValue()
    },
    aValueStart: function (val) {
      this.calcZValue()
    },
    aValueEnd: function (val) {
      this.calcZValue()
    }
  }
})
</script>
