<template>
  <v-simple-table>
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
          <td :id="'000-' + row[0]">{{ row[1] }}</td>
          <td :id="'001-' + row[0]">{{ row[2] }}</td>
          <td :id="'002-' + row[0]">{{ row[3] }}</td>
          <td :id="'003-' + row[0]">{{ row[4] }}</td>
          <td :id="'004-' + row[0]">{{ row[5] }}</td>
          <td :id="'005-' + row[0]">{{ row[6] }}</td>
          <td :id="'006-' + row[0]">{{ row[7] }}</td>
          <td :id="'007-' + row[0]">{{ row[8] }}</td>
          <td :id="'008-' + row[0]">{{ row[9] }}</td>
          <td :id="'009-' + row[0]">{{ row[10] }}</td>
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
  }
})
</script>
