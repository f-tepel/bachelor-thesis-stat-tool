<template>
  <v-flex>
    <v-btn class="ma-2" elevation="2" :color="(isGreater == true) ? 'primary' : 'secondary'" @click='updateMode("greater")'>[</v-btn>
    <v-btn class="ma-2" elevation="2" :color="(isSmaller == true) ? 'primary' : 'secondary'" @click='updateMode("smaller")'>]</v-btn>
    <v-btn class="ma-2" elevation="2" :color="(isBetween == true) ? 'primary' : 'secondary'" @click='updateMode("between")'>[]</v-btn>
  </v-flex>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'Settings',
  data () {
    return {
      //
    }
  },
  methods: {
    updateMode: function (mode: string) {
      console.log('update')
      this.$store.commit('setMode', mode)
    }
  },
  computed: {
    isGreater () {
      return this.$store.state.isGreater
    },
    isSmaller () {
      return this.$store.state.isSmaller
    },
    isBetween () {
      return this.$store.state.isBetween
    }
  }
})
</script>

<style>
.active {
  background: green;
  color: green;
}

</style>
