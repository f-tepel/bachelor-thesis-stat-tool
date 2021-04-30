<template>
  <div>
    Greater<br>
    <DefaultChart :mean="3" :std="2" :aValue="3" :isGreater="true"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import DefaultChart from '../DefaultChart.vue'

export default Vue.extend({
  name: 'SimpleGreaterThan',
  components: {
    DefaultChart
  }
})
</script>
