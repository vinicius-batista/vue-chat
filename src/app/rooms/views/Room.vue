<template>
  <v-container grid-list-xs>
    <RoomToolbar :name="room.name"></RoomToolbar>
    <v-layout>
      <v-flex xs12>
        <MessagesList ref="messagesList">
          <MessagesListItem
            v-for="message in room.messages"
            :key="message.id"
            v-bind="message"
            @hook:mounted="$refs.messagesList.setScrollMax()"
          />
        </MessagesList>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <MessagesForm v-model="text" @submit="handleSubmit"/>
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
import createMessageMutation from '../graphql/createMessage.gql'
import { prepend, assoc, reverse } from 'ramda'

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
    },
    text: ''
  }),
  methods: {
    handleSubmit () {
      const input = {
        text: this.text,
        roomId: Number(this.$route.params.id)
      }

      return this
        .$apollo
        .mutate({
          mutation: createMessageMutation,
          variables: { input },
          update: this.updateMessages
        })
        .then(() => {
          this.text = ''
          this.$refs.messagesList.setScrollMax()
        })
    },
    updateMessages (store, { data: { createMessage } }) {
      const { room } = store.readQuery({
        query: roomQuery,
        variables: { id: Number(this.$route.params.id) }
      })

      const newMessages = prepend(createMessage, room.messages)

      store.writeQuery({
        query: roomQuery,
        variables: { id: Number(this.$route.params.id) },
        data: { room: assoc('messages', newMessages, room) }
      })
    }
  },
  apollo: {
    room: {
      query: roomQuery,
      update ({ room }) {
        const messagesReversed = reverse(room.messages)
        return assoc('messages', messagesReversed, room)
      },
      variables () {
        return {
          id: Number(this.$route.params.id)
        }
      }
    }
  }
}
</script>
