<template>
  <v-flex v-bind:class="{ 'text-center': $vuetify.breakpoint.mobile }">
    <v-btn class="ma-2" elevation="2" :color="(isSmaller == true) ? 'primary' : 'secondary'" @click='updateMode("smaller")'>]</v-btn>
    <v-btn class="ma-2" elevation="2" :color="(isGreater == true) ? 'primary' : 'secondary'" @click='updateMode("greater")'>[</v-btn>
    <v-btn class="ma-2" elevation="2" :color="(isBetween == true) ? 'primary' : 'secondary'" @click='updateMode("between")'>[]</v-btn>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2"
          elevation="2"
          color="green"
          dark
          v-bind="attrs"
          v-on="on">
          Share</v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >Dein Link</v-toolbar>
          <v-card-text>
            <div class="text-subtitle-2 pa-12">{{shareLink}}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="copy"
            >Kopieren</v-btn>
            <v-btn
              text
              @click="dialog.value = false"
            >Schließen</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-flex>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'Settings',
  methods: {
    updateMode: function (mode: string) {
      this.$store.commit('setMode', mode)
    },
    copy: function () {
      navigator.clipboard.writeText(this.shareLink).then(function () {
        console.log('Async: Copying to clipboard was successful!')
      }, function (err) {
        console.error('Async: Could not copy text: ', err)
      })
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
    },
    shareLink () {
      const baseUrl = `${window.location.host}/#?mean=${this.$store.state.mean}&std=${this.$store.state.std}`

      if (this.$store.state.isBetween) {
        return baseUrl + `&mode=inBetween&a1=${this.$store.state.aValueStart}&a2=${this.$store.state.aValueEnd}`
      } else if (this.$store.state.isGreater) {
        return baseUrl + `&mode=greater&a=${this.$store.state.aValue}`
      } else {
        return baseUrl + `&mode=smaller&a=${this.$store.state.aValue}`
      }
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
