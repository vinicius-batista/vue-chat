<script>
import RoomsListItem from './RoomsListItem'

const renderRoomsListItem = room =>
  <RoomsListItem
    key={room.id}
    room={room}
  />

export default {
  name: 'RoomsList',
  functional: true,
  props: {
    rooms: {
      type: Array,
      required: true
    }
  },
  render (h, { props }) {
    const { rooms } = props
    return (
      <v-list-group prepend-icon='group'>
        <v-list-tile slot='activator'>
          <v-list-tile-title>My Rooms</v-list-tile-title>
        </v-list-tile>
        <v-list dense two-line>
          { rooms.map(renderRoomsListItem)}
        </v-list>
      </v-list-group>
    )
  }
}
</script>
