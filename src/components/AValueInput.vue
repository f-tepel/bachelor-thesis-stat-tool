<template>
  <div>
    <div class='slider' v-if="!isBetween">
      <p>A Value</p>
      <input type='number' :step='step' class='paramField' :min='min' v-model='value' @change="updateAValue"/><br>
      <input class='paramSlider' type='range' :min='min' v-bind:max='max' :step='step' v-model='value'  data-orientation='vertical' @change="updateAValue"/>
    </div>
    <div v-if="isBetween" class="d-flex flex-row">
      <div>
        <p>A start value</p>
        <input type='number' :step='step' class='paramField' :min='min' v-model='start' @change="updateAValueStart"/><br>
        <input class='paramSlider' type='range' :min='min' v-bind:max='max' :step='step' v-model='start'  data-orientation='vertical' @change="updateAValueStart"/>
      </div>
      <div>
        <p>A end value</p>
        <input type='number' :step='step' class='paramField' :min='min' v-model='end' @change="updateAValueEnd"/><br>
        <input class='paramSlider' type='range' :min='min' v-bind:max='max' :step='step' v-model='end'  data-orientation='vertical' @change="updateAValueEnd"/>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AValueInput',
  props: ['name', 'step', 'setMethod', 'min', 'max', 'storeName'],
  data () {
    return {
      value: this.$store.state[this.storeName],
      start: this.$store.state.aValueStart,
      end: this.$store.state.aValueEnd
    }
  },
  methods: {
    updateAValue () {
      this.$store.commit('setAValue', this.value)
    },
    updateAValueStart () {
      if (this.start >= this.end) {
        this.start = Math.round((this.end - 0.1) * 100) / 100
      }

      this.$store.commit('setAValueStart', this.start)
    },
    updateAValueEnd () {
      this.start = parseFloat(this.start)
      this.end = parseFloat(this.end)

      if (this.end <= this.start) {
        this.end = Math.round((this.start + 0.1) * 100) / 100
      }
      this.$store.commit('setAValueEnd', this.end)
    }
  },
  computed: mapState([
    'aValueStart', 'aValueEnd', 'isBetween'
  ])
})
</script>

<style scoped>
.slider {
  margin: 0 auto;
}
</style>
