<template>
  <v-navigation-drawer
    clipped
    fixed
    app
    disable-resize-watcher
    :value="visibility"
  >
    <ApolloQuery :query="profileQuery">
      <template slot-scope="{ result: { data } }">
        <div v-if="data">
          <UserInfo v-bind="getUserInfo(data.profile)"/>
          <v-list class="pt-0">
            <MyRoomsList :rooms="data.profile.rooms" />
            <CreateRoomModal />
            <ProfileModal />
            <SettingsModal />
            <LogoutModal />
          </v-list>
        </div>
      </template>
    </ApolloQuery>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from './UserInfo'
import SideBarListItem from './SideBarListItem'
import MyRoomsList from '@/app/rooms/components/MyRoomsList'
import LogoutModal from '@/app/auth/components/LogoutModal'
import CreateRoomModal from '@/app/rooms/components/CreateRoomModal'
import ProfileModal from '@/app/user/components/ProfileModal'
import SettingsModal from '@/app/user/components/SettingsModal'
import { profileQuery } from '@/domains/user/graphql'
import { dissoc } from 'ramda'

export default {
  name: 'SideBar',
  components: {
    UserInfo,
    SideBarListItem,
    MyRoomsList,
    LogoutModal,
    CreateRoomModal,
    ProfileModal,
    SettingsModal
  },
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    profileQuery
  }),
  methods: {
    getUserInfo (profileResult) {
      return dissoc('rooms', profileResult)
    }
  }
}
</script>
