<template>
  <v-app dark>
    <v-content>
      <v-container grid-list-xs :style="{ padding: 0 }">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style lang="scss">
  html {
   overflow: hidden !important;
 }
</style>
