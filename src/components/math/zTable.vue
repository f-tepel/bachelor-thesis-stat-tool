<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            z
          </th>
          <th id="x-0.00" class="text-left">0,00</th>
          <th id="x-0.01" class="text-left">0,01</th>
          <th id="x-0.02" class="text-left">0,02</th>
          <th id="x-0.03" class="text-left">0,03</th>
          <th id="x-0.04" class="text-left">0,04</th>
          <th id="x-0.05" class="text-left">0,05</th>
          <th id="x-0.06" class="text-left">0,06</th>
          <th id="x-0.07" class="text-left">0,07</th>
          <th id="x-0.08" class="text-left">0,08</th>
          <th id="x-0.09" class="text-left">0,09</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[0]"
        >
          <td :id="'y-' + Number(row[0]).toFixed(1)"><b>{{ row[0] }}</b></td>
          <td :id="Number(row[0]).toFixed(1) + '0'">{{ row[1] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '1'">{{ row[2] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '2'">{{ row[3] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '3'">{{ row[4] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '4'">{{ row[5] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '5'">{{ row[6] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '6'">{{ row[7] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '7'">{{ row[8] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '8'">{{ row[9] }}</td>
          <td :id="Number(row[0]).toFixed(1) + '9'">{{ row[10] }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue'

import zData from './zTable.json'

export default Vue.extend({
  name: 'ZTable',
  data () {
    return {
      rows: zData
    }
  },
  props: {
    zValue: Number,
    zValueTwo: {
      type: Number,
      required: false
    }
  },
  mounted () {
    this.drawBoxes(this.zValue, 0.00, false)
    this.drawBoxes(this.zValueTwo, 0.00, true)
  },
  methods: {
    addClass (id: string, className: string) {
      try {
        // @ts-ignore
        document.getElementById(id).classList.add(className)
      } catch {
        console.log('Failed to add class ' + className + ' to element with id ' + id)
      }
    },
    removeClass (id: string, className: string) {
      try {
        // @ts-ignore
        document.getElementById(id).classList.remove(className)
      } catch {
        console.log('Failed to add class ' + className + ' to element with id ' + id)
      }
    },
    drawBoxes (newVal: number, oldVal: number, useZValueTwo: boolean) {
      newVal = Math.abs(newVal)
      oldVal = Math.abs(oldVal)
      console.log('draw box for ' + newVal)
      console.log(oldVal)
      console.log(this.zValue)

      if (oldVal > 4) {
        oldVal = 4
      }
      if (newVal > 4) {
        newVal = 4
      }
      const roundedNew = Number(newVal).toFixed(2).toString()
      const roundedOld = Number(oldVal).toFixed(2).toString()
      const xAxisValue = 'x-0.0' + roundedNew[3]
      const yAxisValue = 'y-' + roundedNew.substring(0, 3)
      const xAxisValueOld = 'x-0.0' + roundedOld[3]
      const yAxisValuesOld = 'y-' + roundedOld.substring(0, 3)

      if (useZValueTwo) {
        if (oldVal !== Math.abs(this.zValue)) {
          this.removeClass(roundedOld, 'active')
          this.removeClass(xAxisValueOld, 'active-border')
          this.removeClass(yAxisValuesOld, 'active-border')
        }
      } else {
        if (oldVal !== Math.abs(this.zValueTwo)) {
          this.removeClass(roundedOld, 'active')
          this.removeClass(xAxisValueOld, 'active-border')
          this.removeClass(yAxisValuesOld, 'active-border')
        }
      }

      this.addClass(roundedNew, 'active')
      this.addClass(xAxisValue, 'active-border')
      this.addClass(yAxisValue, 'active-border')

      if (useZValueTwo) {
        // @ts-ignore
        const probabilityTableTwo = Number(document.getElementById(roundedNew).innerHTML)
        this.$store.commit('setProbabilityTableTwo', probabilityTableTwo)
      } else {
        // @ts-ignore
        const probabilityTableOne = Number(document.getElementById(roundedNew).innerHTML)
        this.$store.commit('setProbabilityTable', probabilityTableOne)
      }
    }
  },
  watch: {
    zValue: function (newVal, oldVal) {
      this.drawBoxes(newVal, oldVal, false)
    },
    zValueTwo: function (newVal, oldVal) {
      console.log('updating')
      this.drawBoxes(newVal, oldVal, true)
    }
  }
})
</script>

<style scoped>
.active{
  background: green;
  color: white;
}
.active-border {
  border: green!important;
  border-style: solid!important;
}
</style>
