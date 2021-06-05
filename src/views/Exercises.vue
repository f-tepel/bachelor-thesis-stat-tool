<template>
  <v-container>
    <div class="text-h4">
      {{$t('exercises.title')}}
    </div>
    <p>
      {{$t('exercises.text')}}
    </p>
    <v-card>
      <v-card-text>
        {{$t(`exercises.tasks[${index}].text`)}}
      </v-card-text>
      <v-card-text v-if="showAnswer">
        {{$t(`exercises.tasks[${index}].answer`)}}
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          @click="showAnswer = true"
          v-if="showAnswer == false"
        >
        {{$t(`exercises.showAnswer`)}}
        </v-btn>
        <v-btn
          color="primary"
          @click="showAnswer = false"
          v-if="showAnswer == true"
        >
        {{$t(`exercises.hideAnswer`)}}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row class="my-5 justify-center d-none d-lg-block">
      <v-btn class="mx-5 my-1" color="primary" @click="index--; showAnswer = false" v-if="index > 0">
        {{$t(`exercises.previousTask`)}}
      </v-btn>
      <v-btn  class="mx-5 my-1" color="primary" @click="index++; showAnswer = false" v-if="index < (exercises.length - 1)">
        {{$t(`exercises.nextTask`)}}
      </v-btn>
    </v-row>
    <v-row class="my-5 px-2 justify-center d-lg-none">
      <v-btn class="mx-5 my-1" color="primary" @click="index--; showAnswer = false" v-if="index > 0" block>
        {{$t(`exercises.previousTask`)}}
      </v-btn>
      <v-btn  class="mx-5 my-1" color="primary" @click="index++; showAnswer = false" v-if="index < (exercises.length - 1)" block>
        {{$t(`exercises.nextTask`)}}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Exercises',
  data: () => ({
    index: 0,
    showAnswer: false,
    exercises: [
      {
        text: 'Eine Maschine produziert 500 mm lange Schrauben mit einer Standardabweichung von 10 mm. Die Länge der Schrauben kann als normalverteilt angesehen werden. Berechne die Wahrscheinlichkeit dafür, dass eine Schraube kürzer ist als 485 mm.',
        probability: 6.7
      },
      {
        text: 'Für den Ebolavirus wird nach Einschätzung der Statistiker bei 8 % der Bevölkerung eine ärztliche Behandlung notwendig sein. Ein Großhandel möchte für die Apotheken einer Kreisstadt mit 20 000 Einwohnern Behandlungsmaterialien im Voraus bestellen. Mit welcher Wahrscheinlichkeit werden mindestens 1350 Behandlungsmaterialien benötigt?',
        probability: 100
      },
      {
        text: 'Eine Maschine produziert 500 mm lange Schrauben mit einer Standardabweichung von 10 mm. Berechne die Wahrscheinlichkeit dafür, dass eine Schraube höchstens 501 mm und mindestens 499 mm lang ist.',
        probability: 8
      },
      {
        text: 'Für den Ebolavirus wird nach Einschätzung der Statistiker bei 8 % der Bevölkerung eine ärztliche Behandlung notwendig sein. Ein Großhandel möchte für die Apotheken einer Kreisstadt mit 20 000 Einwohnern Behandlungsmaterialien im Voraus bestellen. Mit welcher Wahrscheinlichkeit werden mindestens 1350 Behandlungsmaterialien benötigt? Mit welcher Wahrscheinlichkeit weicht die Zahl der benötigten Behandlungsmaterialien um nicht mehr als die Standardabweichung vom Erwartungswert ab?',
        probability: 68.76
      }
    ]
  })
})
</script>
