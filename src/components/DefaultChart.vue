<template>
  <div class='mycontainer' id='container'>
    <div :id='containerId' class='chart-container'></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import * as d3 from 'd3'
// @ts-ignore
import jStat from 'jstat'

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
  ratio: number,
  ANIMATION_DURATION: number,
  interval: number,
  upperBound: number,
  lowerBound: number,
  probability: number
}

export default Vue.extend({
  name: 'DefaultChart',
  data: (): State => (
    {
      margin: {
        top: 20, right: 10, bottom: 20, left: 40
      },
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
  props: {
    mean: {
      type: Number,
      default: 1
    },
    std: {
      type: Number,
      default: 1
    },
    aValue: {
      type: Number,
      default: 1
    },
    aValueStart: {
      type: Number,
      default: 1
    },
    aValueEnd: {
      type: Number,
      default: 1
    },
    isGreater: {
      type: Boolean,
      default: false
    },
    isSmaller: {
      type: Boolean,
      default: false
    },
    isBetween: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    chartColor: {
      type: String,
      default: 'grey'
    }
  },
  mounted: function () {
    var chartData = this.create_data()

    this.create_chart()
    this.add_x_axis(chartData)
    this.add_y_axis(chartData)
    this.create_area(this.x, this.y)

    this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
  },
  methods: {
    create_chart: function () {
      this.svg = d3.select('#' + this.containerId)
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('class', 'chart')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
    },
    resizeHandler () {
      d3.selectAll('svg').remove()

      var chartData = this.create_data()

      this.create_chart()
      this.add_x_axis(chartData)
      this.add_y_axis(chartData)
      this.create_area(this.x, this.y)

      this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
    },
    create_data: function (): Data {
      this.upperBound = this.mean + (this.std * 4)
      this.lowerBound = this.mean - (this.std * 4)
      const steps = 100
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
        return (this.aValueStart < x && this.aValueEnd > x)
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
        .attr('stroke', this.chartColor)
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
        .style('fill', this.chartColor)

      // update
      a.transition()
        .duration(ANIMATION_DURATION)
        .attr('d', this.area)
        .style('fill', this.chartColor)

      // exit
      a.exit().remove()
    },
    update_from_slider: function () {
      var chartData = this.create_data()
      this.update(chartData, this.x, this.y, this.xAxis, this.yAxis)
    },
    meanMin: function () {
      return this.mean - (this.std * 4)
    },
    meanMax: function () {
      return this.mean + (this.std * 4)
    },
    stdMin: function () {
      return Math.max(this.std - 10, 0.1)
    },
    stdMax: function () {
      return this.std + 10
    }
  },
  computed: {
    containerId () {
      return '_' + Math.random().toString(36).substr(2, 9)
    }
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

.axis path,
.axis line {
    fill: none;
    stroke: red;
    shape-rendering: crispEdges;
}

.axis text {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
    color: green;
}

.text-label {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
    /*font-family: sans-serif;*/
}

.dot {
    stroke: red;
    fill: red
}

#ex1Slider .slider-selection {
  background: red;
}

.area {
  fill: lightsteelblue;
}
</style>
