<template>
  <v-list-group
    prepend-icon="group"
  >
    <v-list-tile slot="activator">
      <v-list-tile-title>My Rooms</v-list-tile-title>
    </v-list-tile>
    <v-list dense two-line>
      <RoomsListItem
        v-for="room in rooms"
        :key="room.id"
        :room="room"
      />
    </v-list>
  </v-list-group>
</template>

<script>
import RoomsListItem from './RoomsListItem'

export default {
  name: 'RoomsList',
  components: {
    RoomsListItem
  },
  props: {
    rooms: {
      type: Array,
      required: true
    }
  }
}
</script>
