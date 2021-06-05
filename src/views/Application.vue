<template>
  <v-container>
    <div class="text-h4">
      {{$t('application.title')}}
    </div>
    <p>
      {{$t('application.text')}}
    </p>
    <br>
    <div class="text-h6">
      {{$t('application.sections[0].title')}}
    </div>
    <v-img src="https://www.1sstockss1.com/wp-content/uploads/2020/11/avoiding-high-votality-810x455-1.jpg" width="600"/>
    <p>
      {{$t('application.sections[0].text')}}
    </p>
    <br>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Application'
})
</script>
