<template>
  <v-container grid-list-xs>
    <RoomToolbar :name="room.name"></RoomToolbar>
    <v-layout>
      <v-flex xs12>
        <MessagesList :messages="room.messages">
          <MessagesListItem slot-scope="{ message }" v-bind="message"/>
        </MessagesList>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <MessagesForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RoomToolbar from '../components/RoomToolbar'
import MessagesForm from '../components/messages/MessagesForm'
import MessagesList from '../components/messages/MessagesList'
import MessagesListItem from '../components/messages/MessagesListItem'
import roomQuery from '../graphql/room.gql'

export default {
  name: 'Room',
  components: {
    RoomToolbar,
    MessagesForm,
    MessagesList,
    MessagesListItem
  },
  data: () => ({
    room: {
      id: '',
      name: '',
      messages: []
    }
  }),
  apollo: {
    room: {
      query: roomQuery,
      variables () {
        return {
          id: Number(this.$route.params.id)
        }
      }
    }
  }
}
</script>
