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
    <br>
    <v-img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" width="600"/>
    <br>
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
