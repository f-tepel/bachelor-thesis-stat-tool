<template>
  <div class="d-flex">
    <DefaultChart
      :mean="parseFloat(mean)"
      :std="parseFloat(std)"
      :aValueStart="parseFloat(aValueStart)"
      :aValueEnd="parseFloat(aValueEnd)"
      :isBetween="true"/>
    <div class="text-h1 d-flex justify-center align-center mx-5">
      =
    </div>
    <DefaultChart
      :mean="parseFloat(mean)"
      :std="parseFloat(std)"
      :aValue="parseFloat(aValueEnd)"
      :isSmaller="true"
      chartColor="steelblue"
    />
    <div class="text-h1 d-flex justify-center align-center mx-5">
      -
    </div>
    <DefaultChart
      :mean="parseFloat(mean)"
      :std="parseFloat(std)"
      :aValue="aValueStart"
      :isSmaller="true"
      chartColor="lightgreen"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import DefaultChart from '../DefaultChart.vue'

export default Vue.extend({
  name: 'SimpleGreaterThan',
  components: {
    DefaultChart
  },
  computed: {
    ...mapState(['mean', 'std', 'aValue', 'aValueStart', 'aValueEnd', 'isGreater'])
  }
})
</script>
