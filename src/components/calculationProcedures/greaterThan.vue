<template>
  <div>
    <div class="text-h5">{{$t('calculation.greaterSteps[0].text')}} greater</div>
    <p class="font-weight-regular">
      {{$t('calculation.greaterSteps[0].description')}}
    </p>
    <PhiFormulaGreater/>
    <div class="text-h5">{{$t('calculation.greaterSteps[1].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.greaterSteps[1].description')}}
    </p>
    <PhiFormulaInner/>
    <PhiFormulaInnerInput/>
    <br>
    <div class="text-h5">{{$t('calculation.greaterSteps[2].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.greaterSteps[2].description')}}
    </p>
    <math display="block">
      <mrow>
        <mi>z</mi>
        <mo>=</mo>
        <mi>{{Number(zValue).toFixed(2)}}</mi>
      </mrow>
    </math>
    <math display="block">
      <mrow>
        <mi>P (x &gt; a)</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mo>&Phi;</mo>
        <mo>(</mo>
        <mi>z</mi>
        <mo>)</mo>
      </mrow>
    </math>
    <div v-if="zValue >= 0">
      <p class="font-weight-regular">
        Da der z Wert positiv bzw. 0 ist, verändert sich die Formel nicht.
      </p>
    </div>
    <div v-if="zValue < 0">
      <p>Da der z Wert negativ ist, muss die Formel geändert werden. Das negative z wird durch die Betragsstriche positiv.</p>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValue}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>(</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mo>|</mo>
          <mi>z</mi>
          <mo>|</mo>
          <mo>)</mo>
          <mo>)</mo>
        </mrow>
      </math>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValue}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mi>{{Number(Math.abs(zValue)).toFixed(2)}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
    </div>
    <div class="text-h5">{{$t('calculation.greaterSteps[3].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.greaterSteps[3].description')}}
    </p>
    <br>
    <math display="block" v-if="zValue >= 0">
      <mrow>
        <mi>P (x &#60; {{aValue}})</mi>
        <mo>=</mo>
        <mi>{{probabilityTable.toFixed(4)}}</mi>
      </mrow>
    </math>
    <math display="block" v-if="zValue < 0">
      <mrow>
        <mi>P (x &#60; {{aValue}})</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mo>(</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mi>{{probabilityTable.toFixed(4)}}</mi>
        <mo>)</mo>
        <mo>=</mo>
        <mi>{{(probabilityTable).toFixed(4)}}</mi>
      </mrow>
    </math>
    <br>
    <ZTable/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import ZTable from '../math/zTable.vue'
import PhiFormulaGreater from '../math/phiFormulaGreater.vue'
import PhiFormulaInner from '../math/phiFormulaInner.vue'
import PhiFormulaInnerInput from '../math/phiFormulaInnerInput.vue'

export default Vue.extend({
  name: 'InBetweenProcedure',
  components: {
    ZTable,
    PhiFormulaGreater,
    PhiFormulaInner,
    PhiFormulaInnerInput
  },
  data () {
    return {
      //
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween', 'probability', 'zValue', 'probabilityTable', 'chartWidth'
  ])
})
</script>
