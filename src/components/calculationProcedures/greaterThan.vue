<template>
  <div>
    <div class="text-h5">{{$t('learn.calculation.greaterSteps[0].text')}}</div>
    <p class="font-weight-regular">
      {{$t('learn.calculation.greaterSteps[0].description')}}
    </p>
    <p>
      {{$t('learn.calculation.greaterSteps[0].description_2')}}
    </p>
    <PhiFormulaGreater/>
    <div class="text-h5">{{$t('learn.calculation.greaterSteps[1].text')}}</div>
    <p class="font-weight-regular">
      {{$t('learn.calculation.greaterSteps[1].description')}}
    </p>
    <PhiFormulaInner/>
    <PhiFormulaInnerInput/>
    <br>
    <div class="text-h5">{{$t('learn.calculation.greaterSteps[2].text')}}</div>
    <p class="font-weight-regular">
      {{$t('learn.calculation.greaterSteps[2].description')}}
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
        {{$t('learn.calculation.greaterSteps[2].valuePositive')}}
      </p>
    </div>
    <div v-if="zValue < 0">
      <p>
        {{$t('learn.calculation.greaterSteps[2].valueNegative')}}
      </p>
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
    <div class="text-h5">{{$t('learn.calculation.greaterSteps[3].text')}}</div>
    <p class="font-weight-regular">
      {{$t('learn.calculation.greaterSteps[3].description')}}
    </p>
    <p>
      <b>{{$t('learn.calculation.inBetweenSteps[3].exampleTitle')}}:</b><br>
      {{$t('learn.calculation.greaterSteps[3].example')}}
    </p>
    <br>
    <math display="block" v-if="zValue >= 0">
      <mrow>
        <mi>P (x &gt; {{aValue}})</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mo>P (x &#60; {{aValue}})</mo>
      </mrow>
    </math>
    <math display="block" v-if="zValue >= 0">
      <mrow>
        <mi>P (x &gt; {{aValue}})</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mo>{{probabilityTable.toFixed(4)}}</mo>
        <mo>=</mo>
        <mi>{{1 - probabilityTable.toFixed(4)}}</mi>
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
    <ZTable :zValue="zValue"/>
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
