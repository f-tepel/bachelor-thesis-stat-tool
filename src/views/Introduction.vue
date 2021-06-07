<template>
  <v-container>
    <div class="text-h4">
      {{$t('introduction.title')}}
    </div>
    <p>
      {{$t('introduction.text')}}
    </p>
    <p>
      <b>{{$t('introduction.learn.title')}}</b><br>
      {{$t('introduction.learn.text')}}
    </p>
    <p>
      <b>{{$t('introduction.definitions.title')}}</b><br>
      {{$t('introduction.definitions.text')}}
    </p>
    <p>
      <b>{{$t('introduction.application.title')}}</b><br>
      {{$t('introduction.application.text')}}
    </p>
    <p>
      <b>{{$t('introduction.exercises.title')}}</b><br>
      {{$t('introduction.exercises.text')}}
    </p>
    <p>
      <b>{{$t('introduction.language.title')}}</b><br>
      {{$t('introduction.language.text')}}
    </p>
    <div class="d-none d-lg-block">
      <v-btn class="mx-2 primary" to="/learn">
        {{$t('introduction.actions[0]')}}
      </v-btn>
      <v-btn class="mx-2 primary" to="/application">
        {{$t('introduction.actions[1]')}}
      </v-btn>
      <v-btn class="mx-2 primary" to="/exercises">
        {{$t('introduction.actions[2]')}}
      </v-btn>
      <v-btn class="mx-2 primary" to="/definitions">
        {{$t('introduction.actions[3]')}}
      </v-btn>    </div>
    <div class="d-lg-none">
      <v-btn block class="my-2 primary" to="/learn">
        {{$t('introduction.actions[0]')}}
      </v-btn>
      <v-btn block class="my-2 primary" to="/application">
        {{$t('introduction.actions[1]')}}
      </v-btn>
      <v-btn block class="my-2 primary" to="/exercises">
        {{$t('introduction.actions[2]')}}
      </v-btn>
      <v-btn block class="my-2 primary" to="/definitions">
        {{$t('introduction.actions[3]')}}
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Introduction'
})
</script>
