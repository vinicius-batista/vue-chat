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
            :current-user-id="profile.id"
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
import {
  createMessageMutation,
  roomQuery,
  messageAddedSubscription
} from '@/domains/rooms/graphql'
import { profileQuery } from '@/domains/user/graphql'
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
    profile: {
      id: ''
    },
    room: {
      id: '',
      name: '',
      messages: []
    },
    text: ''
  }),
  computed: {
    roomId () {
      return Number(this.$route.params.id)
    }
  },
  methods: {
    handleSubmit () {
      const input = {
        text: this.text,
        roomId: this.roomId
      }

      return this
        .$apollo
        .mutate({
          mutation: createMessageMutation,
          variables: { input }
        })
        .then(() => {
          this.text = ''
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
          id: this.roomId
        }
      },
      subscribeToMore: {
        document: messageAddedSubscription,
        variables () {
          return { roomId: this.roomId }
        },
        updateQuery: ({ room }, { subscriptionData }) => {
          const message = subscriptionData.data.messageAdded
          const newMessages = prepend(message, room.messages)
          return { room: assoc('messages', newMessages, room) }
        }
      }
    },
    profile: {
      query: profileQuery
    }
  }
}
</script>
