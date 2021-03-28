<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>Stat-Tool</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <Chart/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from './components/Chart.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Chart
  },

  data: () => ({
    //
  })
})
</script>
