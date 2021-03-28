<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Chart/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue' // @ is an alias to /src

@Component({
  components: {
    Chart
  }
})
export default class Home extends Vue {}
</script>
