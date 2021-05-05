<template>
  <div class="d-flex">
    <div>
      <DefaultChart
        :mean="parseFloat(mean)"
        :std="parseFloat(std)"
        :aValueStart="parseFloat(aValueStart)"
        :aValueEnd="parseFloat(aValueEnd)"
        :isBetween="true"/>
      <div class="text-center">
        P (x > a)
      </div>
      <br>
      <div class="text-center">
        {{this.$store.state.probability.toFixed(4)}}
      </div>
    </div>
    <div class="text-h1 d-flex justify-center align-center mx-5">
      =
    </div>
    <div>
      <DefaultChart
        :mean="parseFloat(mean)"
        :std="parseFloat(std)"
        :aValue="parseFloat(aValueEnd)"
        :isSmaller="true"
        chartColor="steelblue"
      />
      <div class="text-center">
        <math display="block">
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
        </math>
      </div>
      <br>
      <div class="text-center">
        {{this.$store.state.probabilityTableTwo.toFixed(4)}}
      </div>
    </div>
    <div class="text-h1 d-flex justify-center align-center mx-5">
      -
    </div>
    <div>
      <DefaultChart
        :mean="parseFloat(mean)"
        :std="parseFloat(std)"
        :aValue="aValueStart"
        :isSmaller="true"
        chartColor="lightgreen"
      />
      <div class="text-center">
        <math display="block">
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
        </math>
      </div>
      <br>
      <div class="text-center">
        {{(1 - this.$store.state.probabilityTable).toFixed(4)}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import DefaultChart from '../DefaultChart.vue'

export default Vue.extend({
  name: 'SimpleGreaterThan',
  components: {
    DefaultChart
  },
  computed: {
    ...mapState(['mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater'])
  }
})
</script>
