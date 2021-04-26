<template>
  <div>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[0].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[0].description')}}
    </p>
    <PhiFormulaBetween/>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[1].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[1].description')}}
    </p>
    <div class="caption">{{$t('calculation.inBetweenSteps[1].calcZ1')}}</div>
    <PhiFormulaInner zName="z1"/>
    <PhiFormulaInnerInputBetween zName="z1"/>
    <br>
    <div class="caption">{{$t('calculation.inBetweenSteps[1].calcZ2')}}</div>
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
        {{$t('calculation.inBetweenSteps[2].z1.valuePositive')}}
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
      <p>
        {{$t('calculation.inBetweenSteps[2].z1.valueNegative')}}
      </p>
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
          <mo>(</mo>
          <mi>{{Number(Math.abs(zValue)).toFixed(2)}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
    </div>
    <div v-if="zValueTwo >= 0">
      <p class="font-weight-regular">
        {{$t('calculation.inBetweenSteps[2].z2.valuePositive')}}
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
      <p>
        {{$t('calculation.inBetweenSteps[2].z2.valueNegative')}}
      </p>
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
          <mo>(</mo>
          <mi>{{Number(Math.abs(zValueTwo)).toFixed(2)}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
    </div>
    <div class="text-h5">{{$t('calculation.inBetweenSteps[3].text')}}</div>
    <p class="font-weight-regular">
      {{$t('calculation.inBetweenSteps[3].description')}}
    </p>
    <p>
      <b>{{$t('calculation.inBetweenSteps[3].exampleTitle')}}:</b><br>
      {{$t('calculation.inBetweenSteps[3].example')}}
    </p>
    <br>
    <div class="caption">
      {{$t('calculation.inBetweenSteps[3].a1')}}
    </div>
    <div v-if="zValue >= 0">
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueStart}})</mi>
          <mo>=</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{zValue}}</mi>
          <mo>)</mo>
          <mo>=</mo>
          <mi>{{probabilityTable.toFixed(4)}}</mi>
        </mrow>
      </math>
    </div>
    <math display="block" v-if="zValue < 0">
      <math display="block">
        <mrow>
          <mi>P (x &#60; a1)</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{Math.abs(zValue)}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
      <mrow>
        <mi>P (x &#60; {{aValueStart}})</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mi>{{probabilityTable.toFixed(4)}}</mi>
        <mo>=</mo>
        <mi>{{(1 - probabilityTable).toFixed(4)}}</mi>
      </mrow>
    </math>
    <br>
    <br>
    <div class="caption">
      {{$t('calculation.inBetweenSteps[3].a2')}}
    </div>
    <div v-if="zValueTwo >= 0">
      <math display="block">
        <mrow>
          <mi>P (x &#60; {{aValueEnd}})</mi>
          <mo>=</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{zValueTwo.toFixed(4)}}</mi>
          <mo>)</mo>
          <mo>=</mo>
          <mi>{{probabilityTableTwo.toFixed(4)}}</mi>
        </mrow>
      </math>
    </div>
    <math display="block" v-if="zValueTwo < 0">
      <math display="block">
        <mrow>
          <mi>P (x &#60; a2)</mi>
          <mo>=</mo>
          <mi>1</mi>
          <mo>-</mo>
          <mo>&Phi;</mo>
          <mo>(</mo>
          <mi>{{Math.abs(zValueTwo)}}</mi>
          <mo>)</mo>
        </mrow>
      </math>
      <mrow>
        <mi>P (x &#60; {{aValueEnd}})</mi>
        <mo>=</mo>
        <mi>1</mi>
        <mo>-</mo>
        <mi>{{probabilityTableTwo.toFixed(4)}}</mi>
        <mo>=</mo>
        <mi>{{(1 - probabilityTableTwo).toFixed(4)}}</mi>
      </mrow>
    </math>
    <br>
    <br>
    <div class="caption">
      {{$t('calculation.inBetweenSteps[3].total')}}
    </div>
    <br>
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
        <mi>{{probabilityTableTwo}}</mi>
        <mo>-</mo>
        <mi>{{Number(1 - probabilityTable).toFixed(4)}}</mi>
      </mrow>
    </math>
    <br>
    <math display="block">
      <mrow>
        <mi>P (a1 &#60; x &#60; a2)</mi>
        <mo>=</mo>
        <mi>{{Number(probabilityTableTwo - (1 - probabilityTable)).toFixed(4)}}</mi>
      </mrow>
    </math>
    <br>
    <br>
    <ZTable :zValue="zValue" :zValueTwo="zValueTwo"/>
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
    'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween', 'probability', 'zValue', 'zValueTwo', 'probabilityTable', 'probabilityTableTwo', 'chartWidth'
  ])
})
</script>
