<template>
  <div class="container">
    <div class="text-h3">{{$t('learn.calculation.procedure')}}</div>
    <br>
    <div v-if="isSmaller">
      <SimpleSmallerThan/>
    </div>
    <div v-if="isGreater">
      <SimpleGreaterThan/>
    </div>
    <div v-if="isBetween">
      <SimpleInBetween/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SimpleSmallerThan from './simpleCalc/simpleSmallerThan.vue'
import SimpleGreaterThan from './simpleCalc/SimpleGreaterThan.vue'
import SimpleInBetween from './simpleCalc/SimpleInBetween.vue'

export default Vue.extend({
  name: 'SimpleCalculation',
  components: {
    SimpleSmallerThan,
    SimpleGreaterThan,
    SimpleInBetween
  },
  computed: mapState([
    'isGreater', 'isSmaller', 'isBetween', 'chartWidth'
  ])
})
</script>
