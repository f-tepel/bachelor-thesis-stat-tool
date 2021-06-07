<template>
  <v-container>
    <div class="text-h4">
      {{$t('definitions.title')}}
    </div>
    <p>
      {{$t('definitions.text')}}
    </p>
    <br>
    <div>
      <div class="text-h6">
        {{$t('definitions.sections[0].title')}}
      </div>
      <span>
        {{$t('definitions.sections[0].text')}}
      </span>
      <math>
        <mrow>
          <mi>&mu;</mi>
          <mo>=</mo>
          <mfenced>
            <mrow>
              <mo>(</mo>
              <mfrac>
                <mrow>
                  <mi>x1</mi>
                  <mo>+</mo>
                  <mi>x2</mi>
                  <mo>+</mo>
                  <mi>...</mi>
                  <mo>+</mo>
                  <mi>xn</mi>
                </mrow>
                <mi>n</mi>
              </mfrac>
              <mo>)</mo>
            </mrow>
          </mfenced>
        </mrow>
      </math>
      <br>
    </div>
    <br><br>
    <div>
      <div class="text-h6">
        {{$t('definitions.sections[1].title')}}
      </div>
      <span>
        {{$t('definitions.sections[1].text')}}
      </span>
      <math>
        <mrow>
          <mi>&sigma;</mi>
          <mo>=</mo>
          <msqrt>
            <mfrac>
              <mrow>
                <mo>&sum;</mo>
                <mo>(</mo>
                <mi>xi</mi>
                <mo>-</mo>
                <mi>&mu;</mi>
                <mo>)</mo>
              </mrow>
              <mi>n</mi>
            </mfrac>
          </msqrt>
        </mrow>
      </math>
      <br>
    </div>
    <br><br>
    <div>
      <div class="text-h6">
        {{$t('definitions.sections[2].title')}}
      </div>
      <span>
        {{$t('definitions.sections[2].text')}}
      </span>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Definitions'
})
</script>
