<template>
  <div>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[0].text')}} in Between</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[0].description')}}
    </p>
    <PhiFormulaBetween/>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[1].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[1].description')}}
    </p>
    <div class="caption">z1 berechnen</div>
    <PhiFormulaInner zName="z1"/>
    <PhiFormulaInnerInputBetween zName="z1"/>
    <br>
    <div class="caption">z2 berechnen</div>
    <PhiFormulaInner zName="z2"/>
    <PhiFormulaInnerInputBetween zName="z2"/>
    <br>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[2].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[2].description')}}
    </p>
    <math display="block">
      <mrow>
        <mi>z1</mi>
        <mo>=</mo>
        <mi>{{Number(zValue).toFixed(2)}}</mi>
      </mrow>
    </math>
    <math display="block">
      <mrow>
        <mi>z2</mi>
        <mo>=</mo>
        <mi>{{Number(zValueTwo).toFixed(2)}}</mi>
      </mrow>
    </math>
    <math display="block">
      <mrow>
        <mi>P (x &#60; a)</mi>
        <mo>=</mo>
        <mo>&Phi;</mo>
        <mo>(</mo>
        <mi>z</mi>
        <mo>)</mo>
      </mrow>
    </math>
    <div v-if="zValue >= 0">
      <p class="font-weight-regular">
        Da der z1 Wert positiv bzw. 0 ist, verändert sich die Formel nicht.
      </p>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueStart}})</mi>
          <mo>=</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{zValue}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
    </div>
    <div v-if="zValue < 0">
      <p>Da der z1 Wert negativ ist, muss die Formel geändert werden. Das negative z wird durch die Betragsstriche positiv.</p>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueStart}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mo>|</mo>
          <mi>z</mi>
          <mo>|</mo>
          <mo>)</mo>
        </mrow>
      </math>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueStart}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mi>{{Number(Math.abs(zValue)).toFixed(2)}}</mi>
        </mrow>
      </math>
    </div>
    <div v-if="zValueTwo >= 0">
      <p class="font-weight-regular">
        Da der z2 Wert positiv bzw. 0 ist, verändert sich die Formel nicht.
      </p>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueEnd}})</mi>
          <mo>=</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{zValueTwo}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
    </div>
    <div v-if="zValueTwo < 0">
      <p>Da der z1 Wert negativ ist, muss die Formel geändert werden. Das negative z wird durch die Betragsstriche positiv.</p>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueEnd}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mo>|</mo>
          <mi>z</mi>
          <mo>|</mo>
          <mo>)</mo>
        </mrow>
      </math>
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueEnd}})</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mi>{{Number(Math.abs(zValueTwo)).toFixed(2)}}</mi>
        </mrow>
      </math>
    </div>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[3].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[3].description')}}
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
        <mi>{{probabilityTable.toFixed(4)}}</mi>
        <mo>=</mo>
        <mi>{{(1 - probabilityTable).toFixed(4)}}</mi>
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
import PhiFormulaBetween from '../math/phiFormulaInBetween.vue'
import PhiFormulaInner from '../math/phiFormulaInner.vue'
import PhiFormulaInnerInputBetween from '../math/phiFormulaInnerInputBetween.vue'

export default Vue.extend({
  name: 'GreaterThanProcedure',
  components: {
    ZTable,
    PhiFormulaBetween,
    PhiFormulaInner,
    PhiFormulaInnerInputBetween
  },
  data () {
    return {
      //
    }
  },
  computed: mapState([
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween', 'probability', 'zValue', 'zValueTwo', 'probabilityTable', 'chartWidth'
  ])
})
</script>
