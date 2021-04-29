<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>{{$t('title')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(o, i) in LOCALES"
            :key="i"
            @click="() => {
              $i18n.locale = o.value
            }"
          >
            <v-list-item-title>{{ o.value }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from './views/Home.vue'
import { LOCALES } from '@/i18n/locales'
import { defaultLocale } from '@/i18n'

export default Vue.extend({
  name: 'App',

  components: {
    Home
  },
  data: () => ({ LOCALES, defaultLocale }),
  mounted () {
    if (this.$route.query.mean) {
      this.$store.commit('setMean', this.$route.query.mean)
    }

    if (this.$route.query.std) {
      this.$store.commit('setStd', this.$route.query.std)
    }

    if (this.$route.query.mode) {
      this.$store.commit('setMode', this.$route.query.mode)
    }

    if (this.$route.query.mode === 'inBetween') {
      if (this.$route.query.a1) {
        this.$store.commit('setAValueStart', this.$route.query.a1)
      }

      if (this.$route.query.a2) {
        this.$store.commit('setAValueEnd', this.$route.query.a2)
      }
    } else {
      if (this.$route.query.a) {
        this.$store.commit('setAValue', this.$route.query.a)
      }
    }
  }
})
</script>

<style scoped>
select {
  color: white;
}

option {
  color: white!important;
}
</style>
