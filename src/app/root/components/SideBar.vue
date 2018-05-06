<template>
  <v-navigation-drawer
    clipped
    fixed
    app
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
