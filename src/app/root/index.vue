<template>
  <div>
    <NavBar @changeSideBarVisibility="changeSideBarVisibility"/>
    <SideBar :visibility="sideBarVisibility"/>
    <v-layout
      class="fit-on-screen"
      row
    >
      <v-flex xs3>
        <RoomsSearch />
      </v-flex>
      <v-flex xs9>
         <router-view></router-view>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import RoomsSearch from '../rooms/components/RoomsSearch'

export default {
  name: 'Root',
  components: {
    NavBar,
    SideBar,
    RoomsSearch
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
