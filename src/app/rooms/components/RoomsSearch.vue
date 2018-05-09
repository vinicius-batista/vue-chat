<template>
  <div class="overflow fit-on-screen">
    <div class="rooms-search">
      <v-subheader class="search-title">ROOMS</v-subheader>
      <v-spacer />
      <v-text-field
        placeholder="Search"
        append-icon="search"
        v-model="search"
      />
    </div>
    <v-list dense two-line >
      <RoomsListItem
        v-for="room in rooms"
        :key="room.id"
        :room="room"
      />
    </v-list>
  </div>
</template>

<script>
import RoomsListItem from './RoomsListItem'

export default {
  name: 'RoomsSearch',
  components: {
    RoomsListItem
  },
  data: () => ({
    rooms: [],
    search: '',
    cursor: ''
  }),
  apollo: {
    rooms: {
      query: require('../graphql/rooms.gql'),
      variables () {
        return {
          name: this.search
        }
      }
    }
  }
}
</script>

<style lang="scss">
.overflow {
  overflow-y: scroll;
  background: #424242;
}
</style>

<style lang="scss" scoped>
.rooms-search {
  display: flex;
  padding: 1em;
  align-items: center;

  .search-title {
    margin-top: 1em;
  }
}
</style>
