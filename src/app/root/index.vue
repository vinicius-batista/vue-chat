<template>
  <div>
    <NavBar @changeSideBarVisibility="changeSideBarVisibility"/>
    <SideBar :visibility="sideBarVisibility"/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

export default {
  name: 'Root',
  components: {
    NavBar,
    SideBar
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
