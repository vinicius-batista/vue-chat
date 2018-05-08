<template>
  <div>
    <NavBar @changeSideBarVisibility="changeSideBarVisibility"/>
    <SideBar :visibility="sideBarVisibility" :user="user"/>
    <v-layout
      class="fit-on-screen"
      row
    >
      <v-flex xs3>
        <RoomsList :rooms="[]"/>
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
import RoomsList from '../rooms/components/RoomsList'

export default {
  name: 'Root',
  components: {
    NavBar,
    SideBar,
    RoomsList
  },
  data: () => ({
    sideBarVisibility: true
  }),
  methods: {
    changeSideBarVisibility () {
      this.sideBarVisibility = !this.sideBarVisibility
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
