<template>
  <div class="home">
    <Chart/>
    <Calculation/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chart from '@/components/Chart.vue'
import Calculation from '@/components/Calculation.vue'

@Component({
  components: {
    Chart,
    Calculation
  }
})
export default class Home extends Vue {}
</script>
