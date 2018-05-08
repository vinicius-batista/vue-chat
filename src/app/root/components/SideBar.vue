<template>
  <v-navigation-drawer
    clipped
    fixed
    app
    disable-resize-watcher
    :value="visibility"
  >
    <UserInfo :user="user"/>
    <v-list class="pt-0">
      <MyRoomsList :rooms="rooms" />
      <SideBarListItem
        v-for="item in items"
        :item="item"
        :key="item.title"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from './UserInfo'
import SideBarListItem from './SideBarListItem'
import MyRoomsList from '@/app/rooms/components/MyRoomsList'
import { dissoc, prop } from 'ramda'

export default {
  name: 'SideBar',
  components: {
    UserInfo,
    SideBarListItem,
    MyRoomsList
  },
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    items: [
      { icon: 'add', title: 'New Room' },
      { icon: 'account_circle', title: 'Profile' },
      { icon: 'settings', title: 'Settings' },
      { icon: 'exit_to_app', title: 'Logout' }
    ],
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
