<template>
  <div class="home">
    <Chart/>
    <v-card :style="{width: chartWidth + 'px'}" class="mx-auto my-10">
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
      >
        <v-tab key="one">
          Einfach
        </v-tab>
        <v-tab key="two">
          Detailliert
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="one">
          <v-card flat>
            <SimpleCalculation/>
          </v-card>
        </v-tab-item>
        <v-tab-item key="two">
          <v-card flat>
            <Calculation/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

import Chart from '@/components/Chart.vue'
import Calculation from '@/components/Calculation.vue'
import SimpleCalculation from '@/components/SimpleCalculation.vue'

@Component({
  data () {
    return {
      tab: null
    }
  },
  components: {
    Chart,
    Calculation,
    SimpleCalculation
  },
  computed: {
    ...mapState([
      'chartWidth'
    ])
  }
})
export default class Home extends Vue {}
</script>
