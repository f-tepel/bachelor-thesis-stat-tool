<template>
  <v-container>
    <div class="text-h4">
      Einleitung
    </div>
    <p>
      Diese Webanwendung dient dem Erlernen der Wahrscheinlichkeitsrechnung mit Normalverteilungen. Das Tool beinhaltet folgende Funktionen.
    </p>
    <p>
      <b>Lernen</b><br>
      In diesem Teil lernt man wie man Wahrscheinlichkeiten mit Normalverteilungen berechnet. Interaktive Diagramme und Erklärungen vermitteln das Thema verständlich und spielerisch.
    </p>
    <p>
      <b>Anwendungsgebiete</b><br>
      Dieser Teil erläutert Beispiel Bereiche in denen Normalverteilungen tatsächlich verwendet werden, wie diese eingesetzt werden und warum sie eingesetzt werden.
    </p>
    <p>
      <b>Übungsaufgaben</b><br>
      Übungsaufgaben helfen das Gelernte anzuwenden, überprüfen und zu festigen.
    </p>
    <div class="d-none d-lg-block">

    </div>
    <div class="d-lg-none">
      <v-btn block class="my-2 primary" to="/learn">
        Lernen
      </v-btn>
      <v-btn block class="my-2 primary" to="/application">
        Anwendungsgebiete
      </v-btn>
      <v-btn block class="my-2 primary" to="/exercises">
        Übungsaufgaben
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
