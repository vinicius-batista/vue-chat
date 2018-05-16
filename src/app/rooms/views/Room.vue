<template>
  <v-container grid-list-xs>
    <RoomToolbar />
  </v-container>
</template>

<script>
import RoomToolbar from '../components/RoomToolbar'

export default {
  name: 'Room',
  components: {
    RoomToolbar
  }
}
</script>
