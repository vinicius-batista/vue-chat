<template>
  <v-navigation-drawer
    clipped
    fixed
    app
    disable-resize-watcher
    :value="visibility"
  >
    <UserInfo :user="user"/>
    <RoomsList :rooms="rooms"/>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from './UserInfo'
import RoomsList from './RoomsList'
import { dissoc, prop } from 'ramda'

export default {
  name: 'SideBar',
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  components: {
    UserInfo,
    RoomsList
  },
  data: () => ({
    user: {
      id: '',
      name: '',
      username: '',
      email: ''
    },
    rooms: []
  }),
  apollo: {
    profile: {
      query: require('../graphql/profile.gql'),
      manual: true,
      result ({ data: { profile } }) {
        this.user = dissoc('rooms', profile)
        this.rooms = prop('rooms', profile)
      }
    }
  }
}
</script>
