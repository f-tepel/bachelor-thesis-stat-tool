<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            z
          </th>
          <th class="text-left">0,00</th>
          <th class="text-left">0,01</th>
          <th class="text-left">0,02</th>
          <th class="text-left">0,03</th>
          <th class="text-left">0,04</th>
          <th class="text-left">0,05</th>
          <th class="text-left">0,06</th>
          <th class="text-left">0,07</th>
          <th class="text-left">0,08</th>
          <th class="text-left">0,09</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[0]"
        >
          <td><b>{{ row[0] }}</b></td>
          <td :id="row[0] + '0'">{{ row[1] }}</td>
          <td :id="row[0] + '1'">{{ row[2] }}</td>
          <td :id="row[0] + '2'">{{ row[3] }}</td>
          <td :id="row[0] + '3'">{{ row[4] }}</td>
          <td :id="row[0] + '4'">{{ row[5] }}</td>
          <td :id="row[0] + '5'">{{ row[6] }}</td>
          <td :id="row[0] + '6'">{{ row[7] }}</td>
          <td :id="row[0] + '7'">{{ row[8] }}</td>
          <td :id="row[0] + '8'">{{ row[9] }}</td>
          <td :id="row[0] + '9'">{{ row[10] }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import zData from './zTable.json'

export default Vue.extend({
  name: 'ZTable',
  data () {
    return {
      rows: zData
    }
  },
  computed: mapState(['zValue']),
  watch: {
    zValue: function (oldVal, newVal) {
      if (newVal > 4) {
        newVal = 4
      }
      if (oldVal > 4) {
        oldVal = 4
      }
      const roundedNew = Number(newVal).toFixed(2).toString()
      const roundedOld = Number(oldVal).toFixed(2).toString()
      // @ts-ignore
      document.getElementById(roundedOld).classList.add('active')
      // @ts-ignore
      document.getElementById(roundedNew).classList.remove('active')
    }
  }
})
</script>

<style scoped>
.active{
  background: green;
  color: white;
}
</style>
