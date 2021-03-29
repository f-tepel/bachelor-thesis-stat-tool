<template>
  <div class='slider'>
    <p>{{name}}</p>
    <input type='number' :step='step' class='paramField' :min='min' v-model='value' @change="update"/><br>
    <input class='paramSlider' type='range' :min='min' v-bind:max='max' :step='step' v-model='value'  data-orientation='vertical' @change="update"/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'InputSlider',
  props: ['name', 'step', 'setMethod', 'min', 'max'],
  data: () => (
    {
      value: 0
    }
  ),
  methods: {
    update () {
      this.$store.commit(this.setMethod, this.value)
    }
  }
})
</script>

<style scoped>
.slider {
  margin: 0 auto;
}

.axis path,
.axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}

.axis text {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
    color: black;
}

.text-label {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
    /*font-family: sans-serif;*/
}

.dot {
    stroke: #293b47;
    fill: #7A99AC
}

#ex1Slider .slider-selection {
  background: #BABABA;
}

.area {
  fill: lightsteelblue;
}
</style>
