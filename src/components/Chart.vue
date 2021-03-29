<template>
  <v-container class='container' id='container'>
    <h1>Felix' Geiles Stat Tool {{this.mean}}</h1>
    <div class='data-input-container'>
      <InputSlider name='Mean' setMethod='setMean' min=-10 max=10 step=0.1></InputSlider>
      <InputSlider name='Standard Deviation' setMethod='setStd' min=0 max=10 step=0.1></InputSlider>
      <InputSlider name='A value' setMethod='setAValue' min=-10 max=10 step=0.1></InputSlider>
    </div>
    <div id='chart-container' class='chart-container'></div>
    <h2>Prob:</h2>
    <h2>{{probability}}</h2>
  </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import * as d3 from 'd3'
// @ts-ignore
import jStat from 'jstat'
// @ts-ignore
import { create, all } from 'mathjs'
import { mapState } from 'vuex'

import InputSlider from './InputSlider'

interface Data {
  [index: number]: {
    x: number
    y: number
  }
}

interface State {
  x: any;
  xAxis: any;
  y: any;
  yAxis: any;
  svg: any;
  area: any;
  margin: any,
  width: number,
  height: number,
  ANIMATION_DURATION: number,
  interval: number,
  upperBound: number,
  lowerBound: number,
  probability: number
}

export default Vue.extend({
  name: 'Chart',
  components: {
    InputSlider
  },
  data: (): State => (
    {
      margin: {
        top: 20, right: 10, bottom: 20, left: 40
      },
      width: 960,
      height: 400,
      ANIMATION_DURATION: 200,
      interval: 0.05,
      upperBound: 10.0,
      lowerBound: -10.0,
      probability: 0,
      x: null,
      xAxis: null,
      y: null,
      yAxis: null,
      svg: null,
      area: null
    }
  ),
  mounted: function () {
    var chartData = this.create_data()

    this.create_chart()
    this.add_x_axis(chartData)
    this.add_y_axis(chartData)
    this.create_area(this.x, this.y)

    this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
    this.compute_probability()
  },
  methods: {
    create_chart: function () {
      this.svg = d3.select('#chart-container')
        .append('svg')
        .attr('width', this.width + this.margin.top + this.margin.bottom)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('class', 'chart')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
    },
    create_data: function (): Data {
      var n = Math.ceil((this.upperBound - this.lowerBound) / this.interval)
      var data = []

      var xPosition = this.lowerBound
      for (var i = 0; i < n; i++) {
        data.push({
          y: jStat.normal.pdf(xPosition, this.mean, this.std),
          x: xPosition
        })
        xPosition += this.interval
      }
      return (data)
    },
    create_area: function (x: any, y: any) {
      this.area = d3.area()
        .x((d: any) => {
          if (d.x < this.aValue) {
            return x(d.x)
          }
          return x(this.aValue)
        })
        .y0(this.height)
        .y1((d: any) => {
          if (d.x < this.aValue) {
            return y(d.y)
          }
          return y(0)
        })
    },
    add_x_axis: function (chartData: any) {
      this.x = d3.scaleLinear()
        .domain(d3.extent(chartData, function (d: any) { return d.x }) as any)
        .range([0, this.width])
      this.xAxis = d3.axisBottom(this.x)
      this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .attr('class', 'xAxis')
    },
    add_y_axis: function (chartData: any) {
      this.y = d3.scaleLinear().range([this.height, 0])
      this.yAxis = d3.axisLeft(this.y)
      this.svg.append('g')
        .attr('class', 'yAxis')
    },
    update: function (data: any, x: any, y: any, xAxis: any, yAxis: any) {
      const ANIMATION_DURATION = 500

      // Create the X axis:
      x.domain(d3.extent(data, function (d: any) { return d.x }))

      // x.domain([0, d3.max(data, function(d) { return d.x }) ])
      this.svg.selectAll('.xAxis').transition()
        .duration(ANIMATION_DURATION)
        .call(xAxis)

      // create the Y axis
      y.domain([0, d3.max(data, function (d: any) { return d.y })])
      this.svg.selectAll('.yAxis')
        .transition()
        .duration(ANIMATION_DURATION)
        .call(yAxis)

      // Create a update selection: bind to the new data
      var u = this.svg.selectAll('.lineTest')
        .data([data], function (d: any) { return d.y })

      // Updata the line
      u
        .enter()
        .append('path')
        .attr('class', 'lineTest')
        .merge(u)
        .transition()
        .duration(ANIMATION_DURATION)
        .attr('d', d3.line()
          .x(function (d: any) { return x(d.x) })
          .y(function (d: any) { return y(d.y) }))
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2.5)

      var a = this.svg.selectAll('.area')
        .data([data])

      // enter
      a.enter()
        .append('path')
        .attr('class', 'area')
        .transition()
        .duration(ANIMATION_DURATION)
        .attr('d', this.area)

      // update
      a.transition()
        .duration(ANIMATION_DURATION)
        .attr('d', this.area)

      // exit
      a.exit().remove()
    },
    update_from_slider: function () {
      var chartData = this.create_data()
      this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
      this.compute_probability()
    },
    compute_probability: function () {
      const math = create(all, {})
      console.log(this.probability)
      this.probability = (1 - math.erf((this.mean - this.aValue) / (Math.sqrt(2) * this.std))) / 2
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'mean', 'std', 'aValue'
  ]),
  watch: {
    mean: function (val) {
      this.update_from_slider()
    },
    std: function (val) {
      this.update_from_slider()
    },
    aValue: function (val) {
      this.update_from_slider()
    }
  }
})
</script>

<style scoped>
style.css
body {
font: 10pt sans-serif;
}

h1 {
  text-align: center;
  margin-top: 1em;
}

h2 {
  text-align: center;
  margin-top: 1em;
}

p {
  font-family: 'Roboto Slab', serif;
}

.container {
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 90vh;
}

.data-input-container {
  text-align: center;
  display: flex;
  width: 70%;
  margin: 0 auto 75px;
}

.chart-container {
  margin: 0 auto;
}

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
