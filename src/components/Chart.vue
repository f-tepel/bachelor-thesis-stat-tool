<template>
  <div class='mycontainer' id='container'>
    <div id='chart-container' class='chart-container'></div>
    <div class="settings-container" :style="{width: width + 'px'}">
      {{$store.state.mean}}
      <Settings/>
      <br>
      <div class="data-input-container" v-bind:class="{ 'justify-space-around': $vuetify.breakpoint.mobile, 'justify-space-between': !$vuetify.breakpoint.mobile }">
        <InputSlider name='mean' setMethod='setMean' storeName='mean' :min="meanMin()" :max="meanMax()" step=0.1></InputSlider>
        <InputSlider name='std' setMethod='setStd' storeName='std' :min="stdMin()" :max="stdMax()" step=0.1></InputSlider>
        <AValueInput name='A value' setMethod='setAValue' storeName='aValue' :min="meanMin()" :max="meanMax()" step=0.1></AValueInput>
      </div>
      <Probability/>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import * as d3 from 'd3'
// @ts-ignore
import jStat from 'jstat'
// @ts-ignore
import { mapState } from 'vuex'

import InputSlider from './InputSlider.vue'
import AValueInput from './AValueInput.vue'
import Settings from './Settings.vue'
import Probability from './Probability.vue'

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
  ratio: number,
  ANIMATION_DURATION: number,
  interval: number,
  upperBound: number,
  lowerBound: number,
  probability: number
}

export default Vue.extend({
  name: 'Chart',
  components: {
    InputSlider,
    AValueInput,
    Settings,
    Probability
  },
  data: (): State => (
    {
      margin: {
        top: 20, right: 10, bottom: 20, left: 40
      },
      width: 960,
      height: 500,
      ratio: 1300 / 500,
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
  created () {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted: function () {
    this.calcChartSize()
    var chartData = this.create_data()

    this.create_chart()
    this.add_x_axis(chartData)
    this.add_y_axis(chartData)
    this.create_area(this.x, this.y)
    const pct = (((this.std * 4) + parseFloat(this.aValue)) / (this.std * 8)) * 98
    this.svg.append('line')
      .attr('class', 'aLine')
      .style('stroke', 'lightgreen')
      .style('stroke-width', 5)
      .attr('x1', pct + '%')
      .attr('y1', '100%')
      .attr('x2', pct + '%')
      .attr('y2', 0)
    this.svg.append('line')
      .attr('class', 'aLineEnd')
      .style('stroke', 'steelblue')
      .style('stroke-width', 0)
      .attr('x1', pct + '%')
      .attr('y1', '100%')
      .attr('x2', pct + '%')
      .attr('y2', 0)

    this.svg.append('text')
      .attr('class', 'aLabel')
      .attr('x', pct + '%')
      .attr('dy', 0)
      .text(`A = ${this.aValue}`)

    this.svg.append('text')
      .attr('class', 'aLabelEnd')
      .attr('x', pct + '%')
      .attr('dy', 0)

    this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
  },
  methods: {
    create_chart: function () {
      this.svg = d3.select('#chart-container')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('class', 'chart')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
    },
    resizeHandler () {
      d3.selectAll('svg').remove()

      this.calcChartSize()
      var chartData = this.create_data()

      this.create_chart()
      this.add_x_axis(chartData)
      this.add_y_axis(chartData)
      this.create_area(this.x, this.y)

      this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
    },
    calcChartSize () {
      const currentWidth = window.innerWidth
      const currentHeight = window.innerHeight

      if (currentWidth > 1500) {
        this.width = currentWidth * 0.6
        this.height = currentHeight * 0.5
      } else if (currentWidth > 1000) {
        this.width = currentWidth * 0.8
        this.height = currentHeight * 0.5
      } else {
        this.width = currentWidth * 0.95
        this.height = currentHeight * 0.3
      }
      this.$store.commit('setChartWidth', this.width)
    },
    create_data: function (): Data {
      this.upperBound = parseFloat(this.mean) + (this.std * 4)
      this.lowerBound = parseFloat(this.mean) - (this.std * 4)
      const steps = 1000
      this.interval = (this.upperBound - this.lowerBound) / steps
      var data = []

      var xPosition = this.lowerBound
      for (var i = 0; i < steps; i++) {
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
          if (this.isNeededValue(d.x, this.aValue)) {
            return x(d.x)
          }
          if (this.isBetween) {
            if (d.x < this.aValueEnd) {
              return x(this.aValueStart)
            } else {
              return x(this.aValueEnd)
            }
          }

          return x(this.aValue)
        })
        .y0(this.height)
        .y1((d: any) => {
          if (this.isNeededValue(d.x, this.aValue)) {
            return y(d.y)
          }
          return y(0)
        })
    },
    isNeededValue (x: number, a: number) {
      if (this.isSmaller) {
        return x < a
      } else if (this.isGreater) {
        return x > a
      } else {
        return (this.$store.state.aValueStart < x && this.$store.state.aValueEnd > x)
      }
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
    getMeanRatio: function () {
      return (parseFloat(this.mean) / (this.std * 8)) * 100
    },
    getStdRatio: function (aValue: number) {
      return ((this.std * 4) + aValue) / (this.std * 8) * 100
    },
    updateALine: function () {
      if (this.isBetween === true) {
        const pctStart = this.getStdRatio(parseFloat(this.aValueStart)) - this.getMeanRatio()
        const pctEnd = this.getStdRatio(parseFloat(this.aValueEnd)) - this.getMeanRatio()
        this.svg.selectAll('.aLine')
          .attr('x1', pctStart + '%')
          .attr('x2', pctStart + '%')

        this.svg.selectAll('.aLineEnd')
          .style('stroke-width', 5)
          .attr('x1', pctEnd + '%')
          .attr('x2', pctEnd + '%')

        this.updateLineLabel(pctStart - 2, this.aValueStart, '.aLabel')
        this.updateLineLabel(pctEnd - 2, this.aValueEnd, '.aLabelEnd')
      } else {
        const pct = this.getStdRatio(parseFloat(this.aValue)) - this.getMeanRatio()
        this.svg.selectAll('.aLine')
          .attr('x1', pct + '%')
          .attr('x2', pct + '%')
        this.svg.selectAll('.aLineEnd')
          .style('stroke-width', 0)

        this.updateLineLabel(pct - 2, this.aValue, '.aLabel')
        this.updateLineLabel(-100, this.aValue, '.aLabelEnd')
      }
    },
    updateLineLabel: function (position: number, value: number, selector = 'aLabel') {
      this.svg.selectAll(selector)
        .attr('x', position + '%')
        .text(`A = ${value}`)
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
        .attr('stroke', 'grey')
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
        .style('fill', 'grey')

      // update
      a.transition()
        .duration(ANIMATION_DURATION)
        .attr('d', this.area)

      // exit
      a.exit().remove()

      this.updateALine()
    },
    update_from_slider: function () {
      var chartData = this.create_data()
      this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
    },
    meanMin: function () {
      return parseFloat(this.mean) - (this.std * 4)
    },
    meanMax: function () {
      return parseFloat(this.mean) + (this.std * 4)
    },
    stdMin: function () {
      return Math.max(parseFloat(this.std) - 10, 0.1)
    },
    stdMax: function () {
      return parseFloat(this.std) + 10
    }
  },
  computed: {
    ...mapState([
      'mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater', 'isSmaller', 'isBetween'
    ])
  },
  watch: {
    mean: function (val) {
      this.update_from_slider()
    },
    std: function (val) {
      this.update_from_slider()
    },
    aValue: function (val) {
      this.update_from_slider()
    },
    aValueStart: function (val) {
      this.update_from_slider()
    },
    aValueEnd: function (val) {
      this.update_from_slider()
    },
    isGreater: function (val) {
      this.update_from_slider()
    },
    isSmaller: function (val) {
      this.update_from_slider()
    },
    isBetween: function (val) {
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

.mycontainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.data-input-container {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}

.chart-container {
  margin: 0 auto;
}

.settings-container {
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
