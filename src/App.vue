<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <v-toolbar-title>{{$t('title')}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <select v-model="$i18n.locale">
        <option
          v-for="(o, i) in LOCALES"
          :key="i"
          :value="o.value"
          :selected="o.value === defaultLocale"
          >{{ o.caption }}</option
        >
      </select>
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

  data: () => ({ LOCALES, defaultLocale })
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
