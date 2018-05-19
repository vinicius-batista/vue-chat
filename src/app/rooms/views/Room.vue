<template>
  <v-container grid-list-xs>
    <RoomToolbar />
    <v-layout>
      <v-flex xs12>
        <MessagesList>
          <MessagesListItem v-for="i in 10" :key="i"/>
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

export default {
  name: 'Room',
  components: {
    RoomToolbar,
    MessagesForm,
    MessagesList,
    MessagesListItem
  }
}
</script>
