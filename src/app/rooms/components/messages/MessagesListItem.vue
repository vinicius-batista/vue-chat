<template>
  <v-layout class="pa-3" :class="isSent">
    <v-flex xs4 class="display-flex">
      <UserAvatar
        v-if="!isSameId"
        :profilePic="user.profilePic"
        :name="user.username"
        class="user-avatar"
      />
      <v-card class="message grey darken-3">
        <v-card-title class="pt-2 pb-0 body-1">{{ user.username }}</v-card-title>
        <v-card-text class="py-1">
          <span class="white--text caption">{{ text }}</span>
          <span class="white--text time">{{ insertedAt | getTime }}</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { isToday } from '@/helpers/isToday'
import moment from 'moment'
import { equals } from 'ramda'
import UserAvatar from '@/app/user/components/UserAvatar'

export default {
  name: 'MessagesListItem',
  components: { UserAvatar },
  props: {
    user: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    insertedAt: {
      type: String,
      required: true
    },
    currentUserId: {
      type: String,
      required: true
    }
  },
  computed: {
    isSameId () {
      return equals(
        this.user.id,
        this.currentUserId
      )
    },
    isSent () {
      return {
        sent: this.isSameId,
        received: !this.isSameId
      }
    }
  },
  filters: {
    getTime (date) {
      const dateMoment = moment(date)
      return isToday(dateMoment)
        ? dateMoment.format('hh:mm')
        : dateMoment.format('MMM D, hh:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.sent {
  justify-content: flex-end;
  width: 100%;

  .message {
    order: 1;
    border-radius: 5px 5px 0px 5px;
  }
}

.received {
  justify-content: flex-start;
  width: 100%;

  .message {
    width: 100%;
    order: 1;
    border-radius: 5px 5px 5px 0px;
  }

  .display-flex {
    display: flex;
  }

  .user-avatar {
    min-width: 48px;
    margin: 0.2em;
    align-self: center;
  }
}

.message {
  min-width: 50px;
  display: block;

  .time {
    font-size: 0.8rem;
    text-align: right;
  }

  span {
    overflow: hidden;
    display: block;
    padding: 0.1em;
  }
}
</style>
