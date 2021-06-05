<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
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
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-title>{{$t(`introduction.title`)}}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/learn">
            <v-list-item-title>{{$t(`learn.title`)}}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/application">
            <v-list-item-title>{{$t(`application.title`)}}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/exercises">
            <v-list-item-title>{{$t(`exercises.title`)}}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { LOCALES } from '@/i18n/locales'
import { defaultLocale } from '@/i18n'

export default Vue.extend({
  name: 'App',
  data: () => ({
    LOCALES,
    defaultLocale,
    drawer: false
  }),
  metaInfo: {
    title: 'Statistik E-Learning Tool'
  },
  methods: {
    parseRoutes () {
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
        if (this.$route.query.a2) {
          this.$store.commit('setAValueEnd', this.$route.query.a2)
        }
        if (this.$route.query.a1) {
          this.$store.commit('setAValueStart', this.$route.query.a1)
        }
      } else {
        if (this.$route.query.a) {
          this.$store.commit('setAValue', this.$route.query.a)
        }
      }
    }
  },
  created () {
    this.$router.onReady(() => {
      this.parseRoutes()
    })
  },
  watch: {
    $route () {
      this.parseRoutes()
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
