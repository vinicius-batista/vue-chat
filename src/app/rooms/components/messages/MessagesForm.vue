<template>
  <v-form @submit.prevent="">
    <v-layout row>
      <v-flex xs11 class="py-0">
      <v-text-field
        hide-details
        box
        multi-line
        no-resize
        rows="1"
        class="py-0"
      />
    </v-flex>
    <v-flex xs1 class="py-0">
      <v-btn
        type="submit"
        fab
        icon
        large
        class="py-0"
      >
       <v-icon> send </v-icon>
      </v-btn>
    </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'MessagesForm'
}
</script>
