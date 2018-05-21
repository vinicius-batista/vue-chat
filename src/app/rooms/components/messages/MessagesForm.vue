<template functional>
  <v-form @submit.prevent="listeners.submit">
    <v-layout row>
      <v-flex xs11 class="py-0">
      <v-text-field
        placeholder="Write a message"
        hide-details
        box
        multi-line
        no-resize
        rows="1"
        class="py-0"
        :value="props.value"
        @input="listeners.input"
        @keypress.ctrl.enter="listeners.submit"
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
  name: 'MessagesForm',
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
