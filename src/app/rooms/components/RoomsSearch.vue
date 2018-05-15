<template>
  <div class="overflow fit-on-screen">
    <div class="rooms-search">
      <v-subheader class="mt-3 mr-5 white--text">ROOMS</v-subheader>
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
    <PaginationActions
      :hasMore="hasMore"
      @showMore="showMore"
    />
  </div>
</template>

<script>
import RoomsListItem from './RoomsListItem'
import PaginationActions from './PaginationActions'
import { last, concat, length, equals } from 'ramda'
import { isArraySizeDivisor } from '@/helpers/isArraySizeDivisor'
import RoomsQuery from '../graphql/rooms.gql'

export default {
  name: 'RoomsSearch',
  components: {
    RoomsListItem,
    PaginationActions
  },
  data: () => ({
    rooms: [],
    search: ''
  }),
  computed: {
    cursor () {
      const lastRoom = last(this.rooms)
      return lastRoom.insertedAt
    },
    hasMore () {
      return equals(length(this.rooms), 0)
        ? false
        : isArraySizeDivisor(this.rooms, 20)
    }
  },
  methods: {
    showMore () {
      return this
        .$apollo
        .queries
        .rooms
        .fetchMore({
          variables: {
            name: this.search,
            cursor: this.cursor
          },
          updateQuery: this.updateQuery
        })
    },
    updateQuery (previous, { fetchMoreResult }) {
      const newRooms = fetchMoreResult.rooms

      return {
        __typename: previous.rooms.__typename,
        rooms: concat(previous.rooms, newRooms)
      }
    }
  },
  apollo: {
    rooms: {
      query: RoomsQuery,
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
}
</style>
