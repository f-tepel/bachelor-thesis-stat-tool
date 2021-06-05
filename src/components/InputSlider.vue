<template>
  <div>
    <p>{{$t(`learn.${name}`)}}</p>
    <v-text-field type='number' :step='step' class='paramField' :min='min' v-model='value' @change="update"/>
    <input class='paramSlider' type='range' v-bind:min='min' v-bind:max='max' :step='step' v-model='value'  data-orientation='vertical' @change="update"/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'InputSlider',
  props: ['name', 'step', 'setMethod', 'min', 'max', 'storeName'],
  data () {
    return {
      value: this.$store.state[this.storeName]
    }
  },
  methods: {
    update () {
      console.log('updated ')
      this.$store.commit(this.setMethod, this.value)
    }
  }
})
</script>

<style scoped>
.slider {
  margin: 0 auto;
}
</style>
