<template functional>
  <v-list dense two-line>
    <v-list-tile
      class="pt-2"
      v-for="room in props.rooms"
      :key="room.id"
      @click=""
    >
      <v-list-tile-avatar>
        <v-icon>group</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
         <v-list-tile-title>{{ room.name }}</v-list-tile-title>
         <v-list-tile-content>{{ room.description }}</v-list-tile-content>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
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
