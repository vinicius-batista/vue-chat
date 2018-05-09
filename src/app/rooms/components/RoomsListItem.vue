<template functional>
  <v-list-tile
    class="pt-2"
    @click=""
  >
    <v-list-tile-avatar>
      <v-icon small>group</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ props.room.name }}</v-list-tile-title>
      <v-list-tile-content>{{ props.room.description }}</v-list-tile-content>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'RoomsListItem',
  props: {
    room: {
      type: Object,
      required: true
    }
  }
}
</script>
