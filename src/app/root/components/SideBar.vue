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
      <CreateRoomModal />
      <ProfileModal />
      <SideBarListItem
        v-for="item in items"
        :item="item"
        :key="item.title"
      />
      <LogoutModal />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from './UserInfo'
import SideBarListItem from './SideBarListItem'
import MyRoomsList from '@/app/rooms/components/MyRoomsList'
import LogoutModal from '@/app/auth/components/LogoutModal'
import CreateRoomModal from '@/app/rooms/components/CreateRoomModal'
import ProfileModal from '@/app/user/components/ProfileModal'
import ProfileQuery from '../graphql/profile.gql'
import { dissoc, prop } from 'ramda'

export default {
  name: 'SideBar',
  components: {
    UserInfo,
    SideBarListItem,
    MyRoomsList,
    LogoutModal,
    CreateRoomModal,
    ProfileModal
  },
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    items: [
      { icon: 'settings', title: 'Settings' }
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
      query: ProfileQuery,
      manual: true,
      result ({ data: { profile } }) {
        this.user = dissoc('rooms', profile)
        this.rooms = prop('rooms', profile)
      }
    }
  }
}
</script>
