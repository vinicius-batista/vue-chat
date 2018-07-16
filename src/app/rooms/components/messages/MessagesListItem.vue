<script>
import { isToday } from '@/helpers/isToday'
import moment from 'moment'
import { equals } from 'ramda'
import UserAvatar from '@/app/user/components/UserAvatar'

function getTime (date) {
  const dateMoment = moment(date)
  return isToday(dateMoment)
    ? dateMoment.format('hh:mm')
    : dateMoment.format('MMM D, hh:mm')
}

export default {
  name: 'MessagesListItem',
  functional: true,
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
  render (h, { props, listeners }) {
    const { user, text, insertedAt, currentUserId } = props
    const isSameId = equals(user.id, currentUserId)
    const isSent = { sent: isSameId, received: !isSameId }

    return (
      <v-layout staticClass='pa-3' class={isSent}>
        <v-flex xs4 class='display-flex'>
          {!isSameId &&
            <UserAvatar
              profilePic={user.profilePic}
              name={user.username}
              class='user-avatar'
            />}
          <v-card class='message grey darken-3' {...{on: listeners}}>
            <v-card-title class='pt-2 pb-0 body-1'>{ user.username }</v-card-title>
            <v-card-text class='py-1'>
              <span class='white--text caption'>{ text }</span>
              <span class='white--text time'>{ getTime(insertedAt) }</span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    )
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
