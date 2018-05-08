<template>
  <div>
    <NavBar @changeSideBarVisibility="changeSideBarVisibility"/>
    <SideBar :visibility="sideBarVisibility" :user="user"/>
    <v-layout
      class="fit-on-screen"
      row
    >
      <v-flex xs3>
        <RoomsList :rooms="rooms"/>
      </v-flex>
      <v-flex xs9>
         <router-view class="fit-on-screen"></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import RoomsList from './components/RoomsList'
import { dissoc, prop } from 'ramda'
// refatorar para deixar barra lateral e menu de rooms separados. utilizar grid para deixar a room ali no cantinho
export default {
  name: 'Root',
  components: {
    NavBar,
    SideBar,
    RoomsList
  },
  data: () => ({
    sideBarVisibility: true,
    user: {
      id: '',
      name: '',
      username: '',
      email: ''
    },
    rooms: []
  }),
  methods: {
    changeSideBarVisibility () {
      this.sideBarVisibility = !this.sideBarVisibility
    }
  },
  apollo: {
    profile: {
      query: require('./graphql/profile.gql'),
      manual: true,
      result ({ data: { profile } }) {
        this.user = dissoc('rooms', profile)
        this.rooms = prop('rooms', profile)
      }
    }
  }
}
</script>

<style lang="scss">
.fit-on-screen {
  height: calc(100vh - 80px);
  max-height: calc(100vh - 90px);
  margin-top: 0;
}
</style>
