<template>
  <div>
    <p>
      Um die Wahrscheinlichkeit zu errechnen, muss die graue Fläche berechnet werden.
    </p>
    <p>
      Diese Fläche kann berechnet werden, indem man von der gesamten Fläche, hier in blau dargestellt, die grüne Fläche subtrahiert.
    </p>
    <div class="d-flex">
      <div>
        <DefaultChart
          :mean="mean"
          :std="std"
          :aValue="aValue"
          :isGreater="true"/>
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
          :mean="mean"
          :std="std"
          :aValue="mean - (4 * std)"
          :isGreater="isGreater"
          chartColor="steelblue"
        />
        <div class="text-center">
          1
        </div>
        <br>
        <div class="text-center">
          1
        </div>
      </div>
      <div class="text-h1 d-flex justify-center align-center mx-5">
        -
      </div>
      <div>
        <DefaultChart
          :mean="mean"
          :std="std"
          :aValue="aValue"
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
                    <mi>a</mi>
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
          {{(1 - this.$store.state.probability).toFixed(4)}}
        </div>
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
    ...mapState(['mean', 'std', 'aValue', 'isGreater'])
  }
})
</script>
