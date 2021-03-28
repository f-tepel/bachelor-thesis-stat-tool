<template>
  <v-container id='chart-container'>
    Test
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import * as d3 from 'd3'
var { jStat } = require('jstat')

export default Vue.extend({
  name: 'Chart',

  data: () => ({
    margin: {
      top: 20, right: 10, bottom: 20, left: 40
    },
    width: 960,
    height: 400,
    ANIMATION_DURATION: 200,
    interval: 0.05,
    upper_bound: 10.0,
    lower_bound: -10.0,
    mean: 0,
    std: 1,
    aValue: 0
  }),
  methods: {
    create_chart: function () {
      return d3.select('#chart-container')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('class', 'chart')
        .append('g')
        .attr('transform',
          'translate(' + this.margin.left + ',' + this.margin.top + ')')
    },
    create_data: function () {
      var n = Math.ceil((this.upper_bound - this.lower_bound) / this.interval)
      var data = []

        var x_position = this.lower_bound
        for (var i = 0; i < n; i++) {
          data.push({
            "y": jStat.normal.pdf(x_position, this.mean, this.std),
            "x": x_position
          })
          x_position += this.interval
        }
        return (data)
    }
  }
})
</script>
