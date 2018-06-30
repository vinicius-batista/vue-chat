<template>
  <v-container grid-list-xs :style="{ padding: 0 }">
    <ApolloQuery
      :query="roomQuery"
      :variables="{ id: roomId }"
    >
      <ApolloSubscribeToMore
        :document="messageAddedSubscription"
        :variables="{ roomId }"
        :updateQuery="updateMessages"
      />
      <template slot-scope="{ result: { data: roomData } }">
        <div v-if="roomData">
          <RoomToolbar :name="roomData.room.name"></RoomToolbar>
          <v-layout>
            <v-flex xs12>
              <MessagesList ref="messagesList">
                <ApolloQuery :query="profileQuery">
                  <template slot-scope="{ result: { data: profileData } }">
                    <MessagesListItem
                      v-if="profileData"
                      v-for="message in reverseMessages(roomData.room.messages)"
                      :key="message.id"
                      v-bind="message"
                      :current-user-id="profileData.profile.id"
                      @hook:mounted="$refs.messagesList.setScrollMax()"
                    />
                  </template>
                </ApolloQuery>
              </MessagesList>
            </v-flex>
          </v-layout>
        </div>
      </template>
    </ApolloQuery>
    <v-layout>
      <v-flex xs12>
        <ApolloMutation
          :mutation="createMessageMutation"
          @done="submitSuccess()"
        >
          <template slot-scope="{ mutate }">
            <MessagesForm v-model="text" @submit="mutate(getInput())"/>
          </template>
        </ApolloMutation>
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
    roomQuery,
    profileQuery,
    messageAddedSubscription,
    createMessageMutation,
    text: ''
  }),
  computed: {
    roomId () {
      return Number(this.$route.params.id)
    }
  },
  methods: {
    reverseMessages (messages) {
      return reverse(messages)
    },
    getInput () {
      const { roomId, text } = this
      return { variables: { input: { text, roomId } } }
    },
    updateMessages ({ room }, { subscriptionData }) {
      const message = subscriptionData.data.messageAdded
      const newMessages = prepend(message, room.messages)
      return { room: assoc('messages', newMessages, room) }
    },
    submitSuccess () {
      this.text = ''
    }
  }
}
</script>
