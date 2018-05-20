<template functional>
  <v-toolbar dark color="grey darken-3">
    <v-toolbar-title class="white--text">{{ props.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'RoomToolbar',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
