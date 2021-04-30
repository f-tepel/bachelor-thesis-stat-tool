<template>
  <div class="container">
    <div class="text-h3">{{$t('calculation.procedure')}}</div>
    <br>
    <div v-if="isSmaller">
      <SmallerThanProcedure/>
    </div>
    <div v-if="isGreater">
      <SimpleGreaterThan/>
    </div>
    <div v-if="isBetween">
      <InBetweenProcedure/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SimpleGreaterThan from './simpleCalc/SimpleGreaterThan.vue'

export default Vue.extend({
  name: 'SimpleCalculation',
  components: {
    SimpleGreaterThan
  },
  computed: mapState([
    'isGreater', 'isSmaller', 'isBetween', 'chartWidth'
  ])
})
</script>
