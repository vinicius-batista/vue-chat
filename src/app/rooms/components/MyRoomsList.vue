<template functional>
  <v-list-group
    prepend-icon="group"
  >
    <v-list-tile slot="activator">
      <v-list-tile-title>My Rooms</v-list-tile-title>
    </v-list-tile>
    <v-list dense two-line>
      <v-list-tile
        class="pt-2"
        v-for="room in props.rooms"
        :key="room.id"
        @click=""
      >
        <v-list-tile-avatar>
          <v-icon small>group</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ room.name }}</v-list-tile-title>
          <v-list-tile-content>{{ room.description }}</v-list-tile-content>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-list-group>
</template>

<script>
export default {
  name: 'RoomsList',
  props: {
    rooms: {
      type: Array,
      required: true
    }
  }
}
</script>
